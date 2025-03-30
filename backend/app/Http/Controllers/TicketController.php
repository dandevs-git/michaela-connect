<?php

// namespace App\Http\Controllers;

// use App\Http\Requests\StoreTicketRequest;
// use App\Http\Requests\UpdateTicketRequest;
// use App\Http\Requests\AssignTicketRequest;
// use App\Http\Requests\UpdateStatusRequest;
// use App\Models\ActivityLog;
// use App\Models\Priority;
// use App\Models\Ticket;
// use App\Models\TicketComment;
// use App\Models\User;
// use Carbon\Carbon;
// use Illuminate\Htt;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\DB;

// class TicketController extends Controller
// {
//     public function index(Request $request)
//     {
//         $user = Auth::user();

//         $query = Ticket::with([
//             'requester:id,name,department_id',
//             'assignedTo:id,name,department_id',
//             'priority:id,name',
//             'comments.user:id,name'
//         ])->latest();

//         $query->where(function ($q) use ($request, $user) {
//             if ($request->filled('requester') && $request->requester === 'me') {
//                 $q->orWhere('requester_id', $user->id);
//             }
//             if ($request->filled('assigned_to') && $request->assigned_to === 'me') {
//                 $q->orWhere('assigned_to', $user->id);
//             }
//         });


//         if ($request->has('status')) {
//             $query->where('status', $request->status);
//         }
//         if ($request->has('priority')) {
//             $query->where('priority', $request->priority);
//         }
//         if ($request->has('department_id')) {
//             $query->where('department_id', $request->department_id);
//         }

//         return response()->json($query->get(), 200);
//     }

//     public function show(int $id)
//     {
//         $ticket = Ticket::with([
//             'requester:id,name',
//             'assignedTo:id,name',
//             'department:id,name',
//             'comments.user:id,name',
//         ])->findOrFail($id);

//         return response()->json($ticket, 200);
//     }

//     public function store(Request $request)
//     {
//         $user = Auth::user();

//         $request->validate([
//             'title' => 'required|string|max:255',
//             'description' => 'required|string',
//             'priority_id' => 'required|exists:priorities,id',
//             'department_id' => 'required|exists:departments,id',
//         ]);

//         $priority = Priority::findOrFail($request->priority_id);

//         $lastTicket = Ticket::latest('id')->first();
//         $ticketNumber = $lastTicket ? "T-" . ($lastTicket->id + 1001) : "T-1001";

//         $ticket = Ticket::create([
//             'ticket_number' => $ticketNumber,
//             'title' => $request->title,
//             'description' => $request->description,
//             'priority_id' => $priority->id,
//             'status' => 'pending',
//             'requester_id' => $user->id,
//             'department_id' => $request->department_id,
//             'response_deadline' => Carbon::now()->addMinutes($priority->response_time),
//             'resolution_deadline' => Carbon::now()->addMinutes($priority->resolution_time),
//         ]);

//         return response()->json([
//             'message' => 'Ticket created successfully',
//             'ticket' => $ticket
//         ], 201);
//     }

//     public function update(Request $request, int $id)
//     {
//         $ticket = Ticket::findOrFail($id);
//         $ticket->update($request->validated());

//         $this->logActivity("Updated ticket #{$ticket->ticket_number}");

//         return response()->json(['message' => 'Ticket updated successfully', 'ticket' => $ticket]);
//     }

//     public function destroy(int $id)
//     {
//         $ticket = Ticket::findOrFail($id);
//         $ticket->delete();

//         $this->logActivity("Deleted ticket #{$ticket->ticket_number}");

//         return response()->json(['message' => 'Ticket deleted successfully']);
//     }

//     public function assign(Request $request, int $id)
//     {
//         $ticket = Ticket::findOrFail($id);

//         if ($ticket->requester_id == $request->assigned_to) {
//             return response()->json(['message' => 'Requester cannot be assigned to their own ticket.'], 422);
//         }

//         $ticket->update([
//             'status' => 'in_progress',
//             'assigned_to' => $request->assigned_to,
//         ]);

//         $this->logActivity("Assigned ticket #{$ticket->ticket_number} to Staff ID {$request->assigned_to}");

//         return response()->json(['message' => 'Ticket assigned successfully']);
//     }

//     public function updateStatus(Request $request, int $id)
//     {
//         $ticket = Ticket::findOrFail($id);

//         if ($request->status === 'resolved') {
//             $ticket->update(['status' => 'resolved', 'resolved_at' => now()]);
//             $this->logActivity("Marked ticket #{$ticket->ticket_number} as Resolved");
//         } elseif ($request->status === 'failed') {
//             $ticket->update(['status' => 'failed', 'failed_at' => now()]);
//             $this->logActivity("Marked ticket #{$ticket->ticket_number} as Failed");
//         } elseif ($request->status === 'reopened') {
//             $ticket->update(['status' => 'in_progress']);
//             $this->logActivity("Reopened ticket #{$ticket->ticket_number}");
//         }

//         return response()->json(['message' => 'Ticket status updated']);
//     }

//     public function addComment(Request $request, int $ticket_id)
//     {
//         $request->validate(['comment' => 'required|string']);
//         $ticket = Ticket::findOrFail($ticket_id);

//         $comment = $ticket->comments()->create([
//             'user_id' => Auth::id(),
//             'comment' => $request->comment,
//         ]);

//         $this->logActivity("Added a comment to Ticket #{$ticket->ticket_number}");

//         return response()->json(['message' => 'Comment added successfully', 'comment' => $comment]);
//     }

//     public function getComments(int $ticket_id)
//     {
//         $comments = TicketComment::where('ticket_id', $ticket_id)
//             ->with('user:id,name')
//             ->latest()
//             ->get();

//         return response()->json($comments);
//     }

//     private function logActivity(string $message): void
//     {
//         ActivityLog::create([
//             'user_id' => Auth::id(),
//             'category' => 'Ticket Management',
//             'action' => $message,
//             'ip_address' => request()->ip(),
//             'pc_name' => gethostname(),
//         ]);
//     }
// }

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Priority;
use App\Models\Ticket;
use App\Models\TicketComment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Ticket::with([
            'requester:id,name,department_id',
            'assignedTo:id,name,department_id',
            'priority:id,name',
            'comments.user:id,name',
        ]);

        $query->where(function ($q) use ($request, $user) {
            if ($request->filled('requester') && $request->requester === 'me') {
                $q->orWhere('requester_id', $user->id);
            }
            if ($request->filled('assigned_to') && $request->assigned_to === 'me') {
                $q->orWhere('assigned_to', $user->id);
            }
        });

        if ($request->has('status')) {
            $query->where('status', $request->query('status'));
        }

        if ($request->has('priority')) {
            $query->where('priority', $request->query('priority'));
        }

        if ($request->has('department_id')) {
            $query->where('department_id', $request->query('department_id'));
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
        $ticket->update(['status' => 'open']);

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
            'status' => 'in_progress',
            'assigned_to' => $request->assigned_to,
        ]);

        $this->logActivity("Ticket #{$ticket->id} assigned to Staff ID {$request->assigned_to}");

        return response()->json(['message' => 'Ticket assigned successfully']);
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
