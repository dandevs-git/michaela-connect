<?php

namespace App\Models;

use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    // public function parent()
    // {
    //     return $this->belongsTo(Role::class, 'parent_id');
    // }

    // public function children()
    // {
    //     return $this->hasMany(Role::class, 'parent_id');
    // }

    // public function allChildren()
    // {
    //     return $this->children()->with('allChildren');
    // }
}
