<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'ticket_comments'; // 👈 Fix is here

    protected $fillable = [
        'ticket_id',
        'user_id',
        'comment',
    ];

    // Define relationship if needed
    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
