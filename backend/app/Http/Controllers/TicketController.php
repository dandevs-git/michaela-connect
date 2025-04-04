<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Department;
use App\Models\Priority;
use App\Models\Ticket;
use App\Models\TicketComment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function Laravel\Prompts\alert;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Ticket::with([
            'requester:id,name,department_id',
            'requester.department:id,name',
            'assignedTo:id,name,department_id',
            'assignedTo.department:id,name',
            'priority:id,name',
            'comments.user:id,name'
        ]);

        // $managerDepartmentIds = [];
        // if ($user->role === 'manager') {
        //     $managerDepartmentIds = Department::whereIn('id', $user->departments->pluck('id'))
        //         ->orWhereIn('parent_id', $user->departments->pluck('id'))
        //         ->pluck('id')
        //         ->toArray();
        // }

        if ($user->role !== 'admin') {
            // $query->where(function ($q) use ($user, $managerDepartmentIds) {
            $query->where(function ($q) use ($user) {
                $q->where('requester_id', $user->id)
                    ->orWhere('assigned_to', $user->id);

                // if ($user->role === 'manager' && !empty($managerDepartmentIds)) {
                //     $q->orWhereIn('department_id', $managerDepartmentIds);
                // }

                if ($user->role === 'head') {
                    $q->orWhere('requester.department?.name', $user->department_id);
                }
            });
        }

        $query->when($request->filled('status'), function ($q) use ($request) {
            $q->where('status', $request->query('status'));
        });

        $query->when($request->filled('priority'), function ($q) use ($request) {
            $q->where('priority_id', $request->query('priority'));
        });

        $query->when($request->filled('department_id'), function ($q) use ($request) {
            $q->where('department_id', $request->query('department_id'));
        });

        // $query->when($request->filled('search'), function ($q) use ($request) {
        //     $q->where(function ($subQuery) use ($request) {
        //         $searchTerm = '%' . $request->query('search') . '%';
        //         $subQuery->where('title', 'like', $searchTerm)
        //             ->orWhere('description', 'like', $searchTerm);
        //     });
        // });

        $tickets = $query->orderBy('created_at', 'desc')->get();
        // $tickets = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json($tickets, 200);
    }



    public function show($id)
    {
        $ticket = Ticket::with([
            'requester:id,name',
            'assignedTo:id,name',
            'department:id,name',
            'comments.user:id,name',
        ])->findOrFail($id);

        return response()->json($ticket, 200);
    }


    public function store(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority_id' => 'required|exists:priorities,id',
            'department_id' => 'required|exists:departments,id',
        ]);

        $priority = Priority::find($request->priority_id);

        if (!$priority) {
            return response()->json(['error' => 'Invalid priority ID'], 400);
        }

        $lastTicket = Ticket::latest('id')->first();
        $ticketNumber = $lastTicket ? "T-" . ($lastTicket->id + 1001) : "T-1001";

        $ticket = Ticket::create([
            'ticket_number' => $ticketNumber,
            'title' => $request->title,
            'description' => $request->description,
            'priority_id' => $priority->id,
            'status' => 'pending',
            'requester_id' => $user->id,
            'department_id' => $request->department_id,
            'response_deadline' => Carbon::now()->addMinutes($priority->response_time),
            'resolution_deadline' => Carbon::now()->addMinutes($priority->resolution_time),
        ]);

        return response()->json(['message' => 'Ticket created successfully', 'ticket' => $ticket], 201);
    }



    public function update(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'priority' => 'sometimes|in:normal,priority,urgent',
            'assigned_to' => 'sometimes|exists:users,id',
            'status' => 'sometimes|in:pending,in_progress,resolved,failed,reopened,completed',
        ]);

        $ticket->update($request->only(['title', 'description', 'priority', 'assigned_to', 'status']));

        $this->logActivity("Ticket #{$ticket->id} updated");

        return response()->json(['message' => 'Ticket updated successfully', 'ticket' => $ticket]);
    }

    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();

        $this->logActivity("Ticket #{$ticket->id} deleted");

        return response()->json(['message' => 'Ticket deleted successfully']);
    }

    public function getSubordinates($id)
    {
        $head = User::with('subordinates')->findOrFail($id);

        return response()->json([
            'head' => $head->name,
            'subordinates' => $head->subordinates
        ]);
    }


    public function approve($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->update(['status' => 'new']);

        $this->logActivity("Head Department approved Ticket #{$ticket->id}");

        return response()->json(['message' => 'Ticket approved']);
    }

    public function reject($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->update(['status' => 'rejected']);

        $this->logActivity("Head Department rejected Ticket #{$ticket->id}");

        return response()->json(['message' => 'Ticket rejected']);
    }

    public function assign(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);
        $request->validate(['assigned_to' => 'required|exists:users,id']);

        if ($ticket->requester_id == $request->assigned_to) {
            return response()->json(['message' => 'Requester cannot be assigned to their own ticket.'], 422);
        }

        $ticket->update([
            'status' => 'open',
            'assigned_to' => $request->assigned_to,
        ]);

        $this->logActivity("Ticket #{$ticket->id} assigned to Staff ID {$request->assigned_to}");

        return response()->json(['message' => 'Ticket assigned successfully']);
    }

    public function startTask($id)
    {
        $user = Auth::user();
        $ticket = Ticket::findOrFail($id);

        if ($ticket->assigned_to !== $user->id) {
            return response()->json(['message' => 'Unauthorized. Only the assigned user can start working on this ticket.'], 403);
        }

        if (!in_array($ticket->status, ['open', 'assigned'])) {
            return response()->json(['message' => 'Ticket must be open or assigned to start working on it.'], 422);
        }

        $ticket->update(['status' => 'in_progress']);

        $this->logActivity("User {$user->name} started working on Ticket #{$ticket->id}");

        return response()->json(['message' => 'Ticket status updated to In Progress', 'ticket' => $ticket]);
    }


    public function updateStatus(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);
        $request->validate(['status' => 'required|in:resolved,failed,reopened']);

        if ($request->status === 'resolved') {
            $ticket->update(['status' => 'resolved', 'resolved_at' => now()]);
            $this->logActivity("Staff marked Ticket #{$ticket->id} as Resolved");
        } elseif ($request->status === 'failed') {
            $ticket->update(['status' => 'failed', 'failed_at' => now()]);
            $this->logActivity("Staff marked Ticket #{$ticket->id} as Failed");
        } elseif ($request->status === 'reopened') {
            $ticket->update(['status' => 'in_progress']);
            $this->logActivity("Staff reopened Ticket #{$ticket->id} for further action");
        }

        return response()->json(['message' => 'Ticket status updated']);
    }

    public function verifyResolution(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);
        $request->validate(['status' => 'required|in:closed,reopened,failed']);

        if ($request->status === 'closed') {
            $ticket->update(['status' => 'closed', 'completed_at' => now()]);
            $this->logActivity("Requester verified Ticket #{$ticket->id} as Completed");
        } elseif ($request->status === 'reopened') {
            $ticket->update(['status' => 'in_progress']);
            $this->logActivity("Requester reopened Ticket #{$ticket->id}");
        } elseif ($request->status === 'failed') {
            $ticket->update(['status' => 'failed']);
            $this->logActivity("Requester acknowledged Ticket #{$ticket->id} as Failed");
        }

        return response()->json(['message' => 'Ticket verification updated']);
    }

    public function close($id)
    {
        $ticket = Ticket::findOrFail($id);

        if ($ticket->status === 'completed') {
            $this->logActivity("System closed Ticket #{$ticket->id} as Completed");
        } elseif ($ticket->status === 'failed') {
            $this->logActivity("System closed Ticket #{$ticket->id} as Failed");
        } else {
            return response()->json(['message' => 'Ticket need to updated resolution status before closing']);
        }

        return response()->json(['message' => 'Ticket closed']);
    }

    public function addComment(Request $request, $ticket_id)
    {
        $request->validate(['comment' => 'required|string']);

        $ticket = Ticket::findOrFail($ticket_id);

        $comment = TicketComment::create([
            'ticket_id' => $ticket->id,
            'user_id' => Auth::id(),
            'comment' => $request->comment,
        ]);

        $this->logActivity("User " . Auth::user()->name . " commented on Ticket #{$ticket->id}");

        return response()->json(['message' => 'Comment added successfully', 'comment' => $comment]);
    }

    public function getComments($ticket_id)
    {
        $ticket = Ticket::findOrFail($ticket_id);
        $comments = $ticket->comments()->with('user:id,name')->latest()->get();

        return response()->json($comments);
    }

    public function editComment(Request $request, $comment_id)
    {
        $request->validate(['comment' => 'required|string']);

        $comment = TicketComment::where('id', $comment_id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $comment->update([
            'comment' => $request->comment,
            'edited_at' => now(),
        ]);

        $this->logActivity("User " . Auth::user()->name . " edited comment on Ticket #{$comment->ticket_id}");

        return response()->json(['message' => 'Comment updated successfully', 'comment' => $comment]);
    }

    public function deleteComment($comment_id)
    {
        $comment = TicketComment::where('id', $comment_id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $comment->delete();

        $this->logActivity("User " . Auth::user()->name . " deleted a comment on Ticket #{$comment->ticket_id}");

        return response()->json(['message' => 'Comment deleted successfully']);
    }

    public function restoreComment($comment_id)
    {
        $comment = TicketComment::onlyTrashed()->findOrFail($comment_id);

        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->restore();

        $this->logActivity("Admin restored a deleted comment on Ticket #{$comment->ticket_id}");

        return response()->json(['message' => 'Comment restored successfully']);
    }

    public function forceDeleteComment($comment_id)
    {
        $comment = TicketComment::onlyTrashed()->findOrFail($comment_id);

        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->forceDelete();

        $this->logActivity("Admin permanently deleted a comment on Ticket #{$comment->ticket_id}");

        return response()->json(['message' => 'Comment permanently deleted']);
    }

    private function logActivity($message)
    {
        ActivityLog::create([
            'user_id' => Auth::id(),
            'category' => 'Ticket Management',
            'action' => $message,
            'details' => $message,
            'ip_address' => request()->ip(),
            'pc_name' => gethostname(),
        ]);
    }
}
