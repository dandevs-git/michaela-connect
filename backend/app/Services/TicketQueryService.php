<?php

namespace App\Services;

use App\Models\Ticket;
use App\Models\Department;
use Illuminate\Support\Facades\Auth;

class TicketQueryService
{
    public static function queryForCurrentUser()
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

            $query->where(function ($q) use ($managedDeptIds) {
                $q->whereHas('requester', function ($sub) use ($managedDeptIds) {
                    $sub->whereIn('department_id', $managedDeptIds);
                })->orWhereHas('assignedTo', function ($sub) use ($managedDeptIds) {
                    $sub->whereIn('department_id', $managedDeptIds);
                });
            });
        } elseif ($user->can('view own department tickets')) {
            $query->where(function ($q) use ($user) {
                $q->whereHas('requester', function ($sub) use ($user) {
                    $sub->where('department_id', $user->department_id);
                })->orWhereHas('assignedTo', function ($sub) use ($user) {
                    $sub->where('department_id', $user->department_id);
                });
            });
        } elseif ($user->can('view own tickets')) {
            $query->where(function ($q) use ($user) {
                $q->where('requester_id', $user->id)
                    ->orWhere('assigned_to', $user->id);
            });
        } else {
            abort(403, 'Unauthorized');
        }

        return $query;
    }
}
