<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wifi extends Model
{
    use HasFactory;

    // Allow mass assignment for these fields
    protected $fillable = [
        'user_id',
        'device',
        'ip_address',
        'ssid',
        'gateway',
        'mac_address',
    ];

    // Relationship: each WiFi record belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
