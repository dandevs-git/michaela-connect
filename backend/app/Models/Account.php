<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'link',
        'username',
        'password',
        'department',
        'person_used',
        'purpose',
        'recovery_email',
        'recovery_number',
        'verification',
        'description',
    ];
}
