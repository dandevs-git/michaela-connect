<?php

namespace App\Services;

use App\Models\Department;
use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;

class TeamTicketQueryService
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

        if ($user->can('view all tickets')) {
        } elseif ($user->can('view department tickets')) {
            $managedDeptIds = Department::where('id', $user->department_id)
                ->orWhere('parent_id', $user->department_id)
                ->pluck('id')
                ->toArray();

            $query->where(function ($q) use ($managedDeptIds) {
                $q->whereIn('origin_department_id', $managedDeptIds)
                    ->orWhereIn('target_department_id', $managedDeptIds);
            });
        } elseif ($user->can('view own department tickets')) {
            $query->where(function ($q) use ($user) {
                $q->where('origin_department_id', $user->department_id)
                    ->orWhere('target_department_id', $user->department_id);
            });
        } else {
            abort(403, 'Unauthorized');
        }

        return $query->orderBy('created_at', 'desc');
    }
}


// elseif ($user->can('view own tickets')) {
//             $query->where(function ($q) use ($user) {
//                 $q->where('requester_id', $user->id)
//                     ->orWhere('assigned_to', $user->id);
//             });
//         }