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
        'status',
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

    public function telephone()
    {
        return $this->belongsTo(Telephone::class);
    }

    public function ipAddress()
    {
        return $this->belongsTo(IpAddress::class);
    }

    public function anydesk()
    {
        return $this->belongsTo(Anydesk::class);
    }

    public function internetLine()
    {
        return $this->belongsTo(Internet::class);
    }
    public function printer()
    {
        return $this->belongsTo(Printer::class);
    }

}


