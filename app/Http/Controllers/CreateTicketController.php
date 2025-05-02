<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\Category;
use App\Models\Label;
use Inertia\Inertia;
use App\Models\TicketAttachment;

class CreateTicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::with(['categories', 'labels', 'attachments'])
            ->where('user_id', auth()->id()) // Filter by the logged-in user's ID
            ->get();

        return Inertia::render('ViewTicket', [
            'tickets' => $tickets->toArray(), // 👈 Force proper serialization
        ]);

    }

    public function create()
    {
        $categories = Category::all()->pluck('name');
        $labels = Label::all()->pluck('name');

        return Inertia::render('CreateTicket', [
            'categories' => $categories,
            'labels' => $labels,
            'success' => session('success'),
        ]);

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high',
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:open,in_progress,closed',
            'attachment' => 'nullable|file|max:2048',
            'categories' => 'array',
            'categories.*' => 'string|exists:categories,name',
            'labels' => 'array',
            'labels.*' => 'string|exists:labels,name',
        ]);

        $ticket = Ticket::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'priority' => $validated['priority'],
            'user_id' => $validated['user_id'],
            'status' => $validated['status'],
            'agent_id' => null,
        ]);
        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('attachments', 'public'); // Store the file in 'public/attachments'
            TicketAttachment::create([
                'ticket_id' => $ticket->id,
                'file_path' => $path,
            ]);
        }

        $categoryIds = Category::whereIn('name', $validated['categories'])->pluck('id');
        $labelIds = Label::whereIn('name', $validated['labels'])->pluck('id');

        $ticket->categories()->attach($categoryIds);
        $ticket->labels()->attach($labelIds);

        return redirect()->route('createticket')->with('success', 'Ticket submitted!');
    }

    public function view($id)
    {
        // Fetch ticket along with its related categories, labels, and attachments
        $ticket = Ticket::with(['categories', 'labels', 'attachments'])
            ->where('user_id', auth()->id()) // Only fetch tickets for the logged-in user
            ->find($id);  // Fetch the specific ticket by ID

        // Check if ticket exists
        if (!$ticket) {
            return redirect()->route('tickets.index')->with('error', 'Ticket not found');
        }

        // Pass ticket data, including related categories, labels, and attachments to the view
        return Inertia::render('ViewTicket', [
            'ticket' => $ticket,
            'categories' => $ticket->categories,  // Categories relation
            'labels' => $ticket->labels,  // Labels relation
            'attachments' => $ticket->attachments,  // Attachments relation
            'user' => auth()->user(),
        ]);
    }




}
