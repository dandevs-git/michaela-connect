<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    /** @use HasFactory<\Database\Factories\ActivityLogFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category',
        'action',
        'details',
        'pc_name',
        'ip_address',
    ];

    protected $appends = ['formatted_date', 'formatted_time'];

    public function getFormattedDateAttribute()
    {
        return Carbon::parse($this->created_at)->format('F d, Y'); // Example: March 25, 2025
    }

    public function getFormattedTimeAttribute()
    {
        return Carbon::parse($this->created_at)->format('h:i A'); // Example: 05:05 AM
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
