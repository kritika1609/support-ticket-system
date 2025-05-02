<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Label extends Model
{
    protected $fillable = ['name'];
    public function tickets()
    {
        return $this->belongsToMany(Ticket::class, 'label_ticket');
    }

}
