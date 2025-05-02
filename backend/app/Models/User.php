<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, HasRoles;

    protected $fillable = [
        'rfid',
        'name',
        'username',
        'email',
        'password',
        'profile_picture',
        'role',
        'status',
        'department_id',
        'parent_id',
        'failed_attempts',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function supervisor()
    {
        return $this->parent();
    }

    public function children()
    {
        return $this->hasMany(User::class, 'parent_id');
    }

    public function subordinates()
    {
        return $this->children()->with('subordinates');
    }


}


