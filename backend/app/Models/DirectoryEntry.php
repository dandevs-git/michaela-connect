<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DirectoryEntry extends Model
{
    use HasFactory;

    protected $fillable = ['category_id', 'name', 'attributes'];

    protected $casts = [
        'attributes' => 'array'
    ];

    public function category()
    {
        return $this->belongsTo(DirectoryCategory::class);
    }

    public function assignments()
    {
        return $this->hasMany(DirectoryAssignment::class, 'entry_id');
    }
}
