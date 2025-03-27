<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DirectoryCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function entries()
    {
        return $this->hasMany(DirectoryEntry::class, 'category_id');
    }
}
