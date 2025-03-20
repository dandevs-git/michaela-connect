<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ticket extends Model
{
    /** @use HasFactory<\Database\Factories\TicketFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'priority',
        'status',
        'requester_id',
        'department_id',
        'requester_head_id',
        'assigned_head_id',
        'assigned_to',
        'resolved_at',
        'failed_at',
        'completed_at',
    ];

    protected $dates = ['resolved_at', 'failed_at', 'completed_at', 'deleted_at'];

    public function requester()
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function requesterHead()
    {
        return $this->belongsTo(User::class, 'requester_head_id');
    }

    public function assignedHead()
    {
        return $this->belongsTo(User::class, 'assigned_head_id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', 'in_progress');
    }

    public function scopeResolved($query)
    {
        return $query->where('status', 'resolved');
    }

    public function scopeFailed($query)
    {
        return $query->where('status', 'failed');
    }
}
