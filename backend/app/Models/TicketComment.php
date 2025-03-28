<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TicketComment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['ticket_id', 'user_id', 'comment', 'edited_at'];

    protected $dates = ['edited_at', 'deleted_at'];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
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
