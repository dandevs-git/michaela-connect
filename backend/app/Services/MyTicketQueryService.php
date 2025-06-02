<?php

namespace App\Services;

use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;

class MyTicketQueryService
{
    public static function queryForCurrentUser()
    {
        $user = Auth::user();

        $query = Ticket::with([
            'originDepartment:id,name',
            'targetDepartment:id,name',
            'requester:id,name,department_id',
            'assignedTo:id,name,department_id',
            'priority:id,name',
            'comments.user:id,name',
        ]);

        $query->where(function ($q) use ($user) {
            $q->where('requester_id', $user->id)
                ->orWhere('assigned_to', $user->id);
        });

        return $query->orderBy('updated_at', 'desc');
    }
}
