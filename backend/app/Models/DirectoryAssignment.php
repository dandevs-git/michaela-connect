<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DirectoryAssignment extends Model
{
    use HasFactory;

    protected $fillable = ['entry_id', 'user_id', 'department_id'];

    public function entry()
    {
        return $this->belongsTo(DirectoryEntry::class, 'entry_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }
}
