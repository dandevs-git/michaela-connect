<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Telephone extends Model
{
    use HasFactory;
    protected $fillable = [
        'number',
        'cable_code',
        'location',
        'description',
    ];
}
