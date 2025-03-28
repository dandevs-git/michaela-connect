<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
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
        'failed_attempts',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function head()
    {
        return $this->belongsTo(User::class, 'head_id');
    }

    public function subordinates()
    {
        return $this->hasMany(User::class, 'head_id');
    }

    // public function getCreatedAtAttribute($value)
    // {
    //     return $value ? Carbon::parse($value)->format('F j, Y') : null;
    // }
    // public function getUpdatedAtAttribute($value)
    // {
    //     return $value ? Carbon::parse($value)->format('F j, Y') : null;
    // }
}
