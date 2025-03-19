<?php

namespace App\Models;

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

    /**
     * Get the user associated with the activity log.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
