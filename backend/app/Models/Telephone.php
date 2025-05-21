<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Telephone extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'number',
        'cable_code',
        'location',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
