<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ticket extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ticket_number',
        'title',
        'description',
        'priority_id',
        'status',
        'origin_department_id',
        'requester_id',
        'target_department_id',
        'assigned_to',
        'resolved_at',
        'failed_at',
        'approved_at',
        'start_at',
        'completed_at',
        'response_deadline',
        'resolution_deadline',
        'sla_breached',
        'remarks',
    ];

    protected $casts = [
        'approved_at' => 'datetime',
        'start_at' => 'datetime',
        'resolved_at' => 'datetime',
        'failed_at' => 'datetime',
        'completed_at' => 'datetime',
        'update_at' => 'datetime',
        'response_deadline' => 'datetime',
        'resolution_deadline' => 'datetime',
        'sla_breached' => 'boolean',
    ];

    protected $dates = ['resolved_at', 'failed_at', 'completed_at', 'deleted_at'];

    public function priority()
    {
        return $this->belongsTo(Priority::class, 'priority_id');
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function originDepartment()
    {
        return $this->belongsTo(Department::class, 'origin_department_id');
    }

    public function targetDepartment()
    {
        return $this->belongsTo(Department::class, 'target_department_id');
    }

    public function comments()
    {
        return $this->hasMany(TicketComment::class, 'ticket_id')->latest();
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    public function scopeOpen($query)
    {
        return $query->where('status', 'open');
    }
    public function scopeInProgress($query)
    {
        return $query->where('status', 'in_progress');
    }

    public function scopeResolved($query)
    {
        return $query->where('status', 'resolved');
    }

    public function scopeClosed($query)
    {
        return $query->where('status', 'closed');
    }

    public function scopeFailed($query)
    {
        return $query->where('status', 'failed');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    public function scopeOverdue($query)
    {
        return $query->where('sla_breached', true);
    }

    // public function getFormattedDate($value)
    // {
    //     return $value ? Carbon::parse($value)->format('F j, Y') : null;
    // }

    // public function getFormattedTime($value)
    // {
    //     return $value ? Carbon::parse($value)->format('h:i A') : null;
    // }

    // public function getApprovedAtAttribute($value)
    // {
    //     return $this->getFormattedDate($value);
    // }

    // public function getResolvedAtAttribute($value)
    // {
    //     return $this->getFormattedDate($value);
    // }

    // public function getFailedAtAttribute($value)
    // {
    //     return $this->getFormattedDate($value);
    // }

    // public function getCompletedAtAttribute($value)
    // {
    //     return $this->getFormattedDate($value);
    // }

    // public function getCreatedAtAttribute($value)
    // {
    //     return $this->getFormattedDate($value);
    // }

    // public function getUpdatedAtAttribute($value)
    // {
    //     return $this->getFormattedDate($value);
    // }

    // public function getResponseDeadlineAttribute($value)
    // {
    //     return $value
    //         ? $this->getFormattedDate($value) . ' : ' . $this->getFormattedTime($value)
    //         : null;
    // }


    // public function getResolutionDeadlineAttribute($value)
    // {
    //     return $value
    //         ? $this->getFormattedDate($value) . ' : ' . $this->getFormattedTime($value)
    //         : null;
    // }
}
