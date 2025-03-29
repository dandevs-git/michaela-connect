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
        'requester_id',
        'assigned_to',
        'resolved_at',
        'failed_at',
        'completed_at',
        'response_deadline',
        'resolution_deadline',
        'sla_breached',
    ];

    protected $casts = [
        'resolved_at' => 'datetime',
        'failed_at' => 'datetime',
        'completed_at' => 'datetime',
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

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function comments()
    {
        return $this->hasMany(TicketComment::class, 'ticket_id')->latest();
    }

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

    /** 📌 ACCESSORS (Format Dates) */
    public function getFormattedDate($value)
    {
        return $value ? Carbon::parse($value)->format('F j, Y') : null;
    }

    public function getResolvedAtAttribute($value)
    {
        return $this->getFormattedDate($value);
    }

    public function getFailedAtAttribute($value)
    {
        return $this->getFormattedDate($value);
    }

    public function getCompletedAtAttribute($value)
    {
        return $this->getFormattedDate($value);
    }

    public function getCreatedAtAttribute($value)
    {
        return $this->getFormattedDate($value);
    }

    public function getUpdatedAtAttribute($value)
    {
        return $this->getFormattedDate($value);
    }
}
