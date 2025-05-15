<?php

namespace App\Models;

use Spatie\Permission\Models\Role;

class CustomRole extends Role
{
    public function parent()
    {
        return $this->belongsTo(CustomRole::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(CustomRole::class, 'parent_id');
    }

    public function hasChildren(): bool
    {
        return $this->children()->exists();
    }
}
