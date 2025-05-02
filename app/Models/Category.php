<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name'];
    public function tickets()
    {
        return $this->belongsToMany(Ticket::class, 'category_ticket');
    }

}
