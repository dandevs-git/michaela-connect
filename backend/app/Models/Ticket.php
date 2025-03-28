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
        'priority',
        'status',
        'requester_id',
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









    // public function getResolvedAtAttribute($value)
    // {
    //     return $value ? Carbon::parse($value)->format('F j, Y') : null;
    // }

    // public function getFailedAtAttribute($value)
    // {
    //     return $value ? Carbon::parse($value)->format('F j, Y') : null;
    // }

    // public function getCompletedAtAttribute($value)
    // {
    //     return $value ? Carbon::parse($value)->format('F j, Y') : null;
    // }

    // public function getCreatedAtAttribute($value)
    // {
    //     return $value ? Carbon::parse($value)->format('F j, Y') : null;
    // }
    // public function getUpdatedAtAttribute($value)
    // {
    //     return $value ? Carbon::parse($value)->format('F j, Y') : null;
    // }
}
