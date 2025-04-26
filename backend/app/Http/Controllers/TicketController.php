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

        if ($user->can('view all tickets')) {

        } elseif ($user->can('view department tickets')) {
            $managedDeptIds = Department::where('id', $user->department_id)
                ->orWhere('parent_id', $user->department_id)
                ->pluck('id')
                ->toArray();

            $query->whereHas('requester', function ($q) use ($managedDeptIds) {
                $q->whereIn('department_id', $managedDeptIds);
            })->orWhereHas('assignedTo', function ($q) use ($managedDeptIds) {
                $q->whereIn('department_id', $managedDeptIds);
            });

        } elseif ($user->can('view own department tickets')) {
            $query->whereHas('requester', function ($q) use ($user) {
                $q->where('department_id', $user->department_id);
            });

        } elseif ($user->can('view own tickets')) {
            $query->where(function ($q) use ($user) {
                $q->where('requester_id', $user->id)
                    ->orWhere('assigned_to', $user->id);
            });
        } else {
            return response()->json(['message' => 'Unauthorizedsdsds'], 403);
        }

        $query->when($request->filled('status'), fn($q) => $q->where('status', $request->query('status')));
        $query->when($request->filled('priority'), fn($q) => $q->where('priority_id', $request->query('priority')));

        if ($request->filled('search')) {
            $query->where(function ($subQuery) use ($request) {
                $term = '%' . $request->query('search') . '%';
                $subQuery->where('title', 'like', $term)
                    ->orWhere('description', 'like', $term);
            });
        }

        $tickets = $query->orderBy('created_at', 'desc')->get();

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

        $this->logActivity("Create Ticket", "Ticket #{$ticket->id} created");
        return response()->json(['message' => 'Ticket created successfully', 'ticket' => $ticket], 201);
    }



    public function update(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'priority_id' => 'sometimes|exists:priorities,id',
            'assigned_to' => 'sometimes|exists:users,id',
            'status' => 'sometimes|in:pending,in_progress,resolved,failed,reopened,completed',
        ]);

        $ticket->update($request->only(['title', 'description', 'priority', 'assigned_to', 'status']));

        $this->logActivity("Update Ticket", "Ticket #{$ticket->id} updated");

        return response()->json(['message' => 'Ticket updated successfully', 'ticket' => $ticket]);
    }

    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();

        $this->logActivity("Delete Ticket", "Ticket #{$ticket->id} deleted");

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
        $ticket->update(['status' => 'new', 'approved_at' => now()]);

        $this->logActivity("Approve Ticket", "Head Department approved Ticket #{$ticket->id}");

        return response()->json(['message' => 'Ticket approved']);
    }

    public function reject($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->update(['status' => 'rejected', 'rejected_at' => now()]);

        $this->logActivity("Reject Ticket", "Head Department rejected Ticket #{$ticket->id}");

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

        $this->logActivity("Assign Ticket", "Ticket #{$ticket->id} assigned to Staff ID {$request->assigned_to}");

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

        $ticket->update(['status' => 'in_progress', 'start_at' => now()]);

        $this->logActivity("Start Ticket", "User {$user->name} started working on Ticket #{$ticket->id}");

        return response()->json(['message' => 'Ticket status updated to In Progress', 'ticket' => $ticket]);
    }


    public function updateStatus(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);
        $request->validate(['status' => 'required|in:resolved,failed,reopened']);

        if ($request->status === 'resolved') {
            $ticket->update(['status' => 'resolved', 'resolved_at' => now()]);
            $this->logActivity(
                "Update Status",
                "Staff marked Ticket #{$ticket->id} as Resolved"
            );
        } elseif ($request->status === 'failed') {
            $ticket->update(['status' => 'failed', 'failed_at' => now()]);
            $this->logActivity("Update Status", "Staff marked Ticket #{$ticket->id} as Failed");
        } elseif ($request->status === 'reopened') {
            $ticket->update(['status' => 'in_progress']);
            $this->logActivity("Update Status", "Staff reopened Ticket #{$ticket->id} for further action");
        }

        return response()->json(['message' => 'Ticket status updated']);
    }

    public function verifyResolution(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);
        $request->validate(['status' => 'required|in:resolved,reopened,failed']);

        $status = $request->status;
        $logMessages = [
            'closed' => 'Requester verified Ticket #%s as Completed',
            'reopened' => 'Requester reopened Ticket #%s',
            'failed' => 'Requester acknowledged Ticket #%s as Failed'
        ];

        $updateData = ['status' => $status];
        if ($status === 'closed')
            $updateData['completed_at'] = now();
        elseif ($status === 'failed')
            $updateData['failed_at'] = now();

        $ticket->update($updateData);
        $this->logActivity("Verify Resolution", sprintf($logMessages[$status], $ticket->id));


        return response()->json(['message' => 'Ticket verification updated']);
    }

    public function close($id)
    {
        $ticket = Ticket::findOrFail($id);

        if ($ticket->status === 'completed') {
            $this->logActivity("Close Ticket", "System closed Ticket #{$ticket->id} as Completed");
        } elseif ($ticket->status === 'failed') {
            $this->logActivity("Close Ticket", "System closed Ticket #{$ticket->id} as Failed");
        } else {
            return response()->json(['message' => 'Ticket need to updated resolution status before closing']);
        }

        return response()->json(['message' => 'Ticket closed']);
    }

    public function addComment(Request $request, $ticket_id)
    {
        $request->validate(['text' => 'required|string']);

        $comment = TicketComment::create([
            'ticket_id' => $ticket_id,
            'user_id' => Auth::id(),
            'text' => $request->text,
        ]);

        $comment->load('user:id,name');
        $this->logActivity('Add Comment', "Comment added on Ticket #{$ticket_id}");

        return response()->json(['message' => 'Comment added Successfully', 'comment' => $comment]);
    }

    public function getComments($ticket_id)
    {
        $comments = TicketComment::where('ticket_id', $ticket_id)
            ->with('user:id,name')
            ->latest()
            ->get();

        return response()->json($comments);
    }

    public function editComment(Request $request, $ticket_id, $comment_id)
    {
        $request->validate(['text' => 'required|string']);

        $comment = TicketComment::where('id', $comment_id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $comment->update(['text' => $request->text, 'edited_at' => now()]);

        $this->logActivity('Edit Comment', "Edited comment on Ticket #{$ticket_id}");

        return response()->json(['message' => 'Comment updated', 'comment' => $comment]);
    }

    public function deleteComment($ticket_id, $comment_id)
    {
        $comment = TicketComment::where('id', $comment_id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $comment->delete();
        $this->logActivity('Delete Comment', "Deleted comment on Ticket #{$ticket_id}");

        return response()->json(['message' => 'Comment deleted']);
    }

    public function restoreComment($ticket_id, $comment_id)
    {
        $comment = TicketComment::onlyTrashed()->findOrFail($comment_id);

        if (!Auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->restore();
        $this->logActivity('Restore Comment', "Restored comment on Ticket #{$ticket_id}");

        return response()->json(['message' => 'Comment restored']);
    }

    public function forceDeleteComment($ticket_id, $comment_id)
    {
        $comment = TicketComment::onlyTrashed()->findOrFail($comment_id);

        if (!Auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->forceDelete();
        $this->logActivity('Force Delete Comment', "Permanently deleted comment on Ticket #{$ticket_id}");

        return response()->json(['message' => 'Comment permanently deleted']);
    }

    private function logActivity($action, $message)
    {
        ActivityLog::create([
            'user_id' => Auth::id(),
            'category' => 'Ticket Management',
            'action' => $action,
            'details' => $message,
            'ip_address' => request()->ip(),
            'pc_name' => gethostname(),
        ]);
    }
}