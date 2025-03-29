<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anydesk extends Model
{
    use HasFactory;
    protected $fillable = [
        'number',
        'location',
        'description',
    ];
}
