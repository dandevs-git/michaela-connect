<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Http\Requests\AssignTicketRequest;
use App\Http\Requests\UpdateStatusRequest;
use App\Models\ActivityLog;
use App\Models\Priority;
use App\Models\Ticket;
use App\Models\TicketComment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TicketController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();

        $query = Ticket::with([
            'requester:id,name,department_id',
            'assignedTo:id,name,department_id',
            'priority:id,name',
            'comments.user:id,name'
        ])->latest();

        if ($request->filled('requester') && $request->requester === 'me') {
            $query->where('requester_id', $user->id);
        }
        if ($request->filled('assigned_to') && $request->assigned_to === 'me') {
            $query->where('assigned_to', $user->id);
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }
        if ($request->filled('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        return response()->json($query->get(), 200);
    }

    public function show(int $id): JsonResponse
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

        $priority = Priority::findOrFail($request->priority_id);

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

        return response()->json([
            'message' => 'Ticket created successfully',
            'ticket' => $ticket
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->update($request->validated());

        $this->logActivity("Updated ticket #{$ticket->ticket_number}");

        return response()->json(['message' => 'Ticket updated successfully', 'ticket' => $ticket]);
    }

    public function destroy(int $id): JsonResponse
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();

        $this->logActivity("Deleted ticket #{$ticket->ticket_number}");

        return response()->json(['message' => 'Ticket deleted successfully']);
    }

    public function assign(Request $request, int $id): JsonResponse
    {
        $ticket = Ticket::findOrFail($id);

        if ($ticket->requester_id == $request->assigned_to) {
            return response()->json(['message' => 'Requester cannot be assigned to their own ticket.'], 422);
        }

        $ticket->update([
            'status' => 'in_progress',
            'assigned_to' => $request->assigned_to,
        ]);

        $this->logActivity("Assigned ticket #{$ticket->ticket_number} to Staff ID {$request->assigned_to}");

        return response()->json(['message' => 'Ticket assigned successfully']);
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $ticket = Ticket::findOrFail($id);

        if ($request->status === 'resolved') {
            $ticket->update(['status' => 'resolved', 'resolved_at' => now()]);
            $this->logActivity("Marked ticket #{$ticket->ticket_number} as Resolved");
        } elseif ($request->status === 'failed') {
            $ticket->update(['status' => 'failed', 'failed_at' => now()]);
            $this->logActivity("Marked ticket #{$ticket->ticket_number} as Failed");
        } elseif ($request->status === 'reopened') {
            $ticket->update(['status' => 'in_progress']);
            $this->logActivity("Reopened ticket #{$ticket->ticket_number}");
        }

        return response()->json(['message' => 'Ticket status updated']);
    }

    public function addComment(Request $request, int $ticket_id): JsonResponse
    {
        $request->validate(['comment' => 'required|string']);
        $ticket = Ticket::findOrFail($ticket_id);

        $comment = $ticket->comments()->create([
            'user_id' => Auth::id(),
            'comment' => $request->comment,
        ]);

        $this->logActivity("Added a comment to Ticket #{$ticket->ticket_number}");

        return response()->json(['message' => 'Comment added successfully', 'comment' => $comment]);
    }

    public function getComments(int $ticket_id): JsonResponse
    {
        $comments = TicketComment::where('ticket_id', $ticket_id)
            ->with('user:id,name')
            ->latest()
            ->get();

        return response()->json($comments);
    }

    private function logActivity(string $message): void
    {
        ActivityLog::create([
            'user_id' => Auth::id(),
            'category' => 'Ticket Management',
            'action' => $message,
            'ip_address' => request()->ip(),
            'pc_name' => gethostname(),
        ]);
    }
}
