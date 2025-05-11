<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Ticket extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'title',
        'description',
        'priority',
        'user_id',
        'status',
    ];
    public function attachments()
    {
        return $this->hasMany(TicketAttachment::class);
    }
    // In Ticket Model (app/Models/Ticket.php)

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_ticket', 'ticket_id', 'category_id');
    }

    public function labels()
    {
        return $this->belongsToMany(Label::class, 'label_ticket', 'ticket_id', 'label_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function agent()
    {
        return $this->belongsTo(User::class, 'agent_id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }


}
