<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class Department extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'parent_id'];

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

    public function hasChildren(): bool
    {
        return $this->children()->exists();
    }

    // public function supervisor()
    // {
    //     return $this->users()
    //         ->with('roles')
    //         ->get()
    //         ->sortBy(function ($user) {
    //             return $this->getRoleDepth($user->roles->first());
    //         })
    //         ->first();
    // }

    // protected function getRoleDepth($role)
    // {
    //     $depth = 0;
    //     while ($role && $role->parent) {
    //         $depth++;
    //         $role = $role->parent;
    //     }
    //     return $depth;
    // }
}
