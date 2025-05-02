<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
class AdminTicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::with(['user:id,name', 'categories:id,name', 'labels:id,name', 'attachments:id,ticket_id,file_path'])
            ->latest()
            ->get();

        return Inertia::render('Admin/AdminTickets', [
            'tickets' => $tickets,
        ]);
    }
}
