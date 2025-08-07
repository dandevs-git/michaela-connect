<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Internet extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'provider',
        'gateway',
        'cable_code',
        'location',
        'description',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
