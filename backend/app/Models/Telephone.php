<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Telephone extends Model
{
    use HasFactory;
    protected $fillable = [
        'telephone_number',
        'cable_code',
        'location',
        'description',
    ];

    public function cable()
    {
        return $this->belongsTo(Cable::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
