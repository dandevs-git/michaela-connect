<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Models\Role;
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
        'position',
        'profile_picture',
        'status',
        'failed_attempts',
        'last_activity_at',

        'department_id',
        'ipAddress_id',
        'telephone_id',
        'printer_id',
        'internet_id',
        'anydesk_id',
        'account_id',
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

    public function telephone()
    {
        return $this->hasOne(Telephone::class);
    }

    public function ipAddress()
    {
        return $this->hasOne(IpAddress::class);
    }

    public function anydesk()
    {
        return $this->hasOne(Anydesk::class);
    }

    public function internetLine()
    {
        return $this->hasOne(Internet::class);
    }

    public function printer()
    {
        return $this->hasOne(Printer::class);
    }

    public function supervisor()
    {
        $role = $this->roles->first();

        if (!$role || !$role->parent_id) {
            return null;
        }

        return self::whereHas('roles', function ($query) use ($role) {
            $query->where('id', $role->parent_id);
        })->where('department_id', $this->department_id)->first();
    }

    public function getAllChildRoleIds($roleId)
    {
        $childRoles = Role::where('parent_id', $roleId)->get();
        $allIds = collect();

        foreach ($childRoles as $role) {
            $allIds->push($role->id);
            $allIds = $allIds->merge($this->getAllChildRoleIds($role->id));
        }

        return $allIds;
    }

    public function allSubordinates()
    {
        $role = $this->roles->first();

        if (!$role) {
            return collect();
        }

        $childRoleIds = $this->getAllChildRoleIds($role->id);

        return self::whereHas('roles', function ($query) use ($childRoleIds) {
            $query->whereIn('id', $childRoleIds);
        })->where('department_id', $this->department_id)->get();
    }
}
