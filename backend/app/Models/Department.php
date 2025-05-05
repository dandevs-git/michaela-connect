<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class Department extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'parent_id', 'role_id',];

    public function users()
    {
        return $this->hasMany(User::class, 'department_id');
    }

    public function parent()
    {
        return $this->belongsTo(Department::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Department::class, 'parent_id');
    }

    public function supervisorRole()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

}
