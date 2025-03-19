<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->role === 'staff') {
            $tickets = Ticket::where('requester_id', $user->id)->get();
        } elseif ($user->role === 'head') {
            $tickets = Ticket::where('department_id', $user->department_id)->get();
        } else {
            $tickets = Ticket::all();
        }
        return response()->json($tickets, 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $ticket = Ticket::create([
            'requester_id' => Auth::id(),
            'department_id' => $request->department_id,
            'title' => $request->title,
            'description' => $request->description,
            'status' => 'Pending',
        ]);

        return response()->json([
            'message' => 'Ticket created successfully',
            'ticket' => $ticket
        ], 201);
    }
    public function show(Ticket $ticket)
    {
        $user = Auth::user();
        if ($user->role === 'staff' && $ticket->requester_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        if ($user->role === 'head' && $ticket->department_id !== $user->department_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response()->json($ticket, 200);
    }

    public function update(Request $request, Ticket $ticket)
    {
        $user = Auth::user();

        if (!in_array($user->role, ['head', 'manager', 'admin'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'assigned_to' => 'nullable|exists:users,id',
            'assigned_department_id' => 'nullable|exists:departments,id',
            'status' => 'required|in:Pending,Approved by Head,Assigned,In Progress,Completed,Reopened,Failed',
        ]);

        $ticket->update([
            'assigned_to' => $request->assigned_to,
            'assigned_department_id' => $request->assigned_department_id,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Ticket updated successfully',
            'ticket' => $ticket
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        $user = Auth::user();

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $ticket->delete();
        return response()->json(['message' => 'Ticket deleted successfully'], 200);
    }
}