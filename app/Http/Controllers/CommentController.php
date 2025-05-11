<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentController extends Controller
{
    // Store comment
    public function store(Request $request)
    {
        // Validate the input
        $validated = $request->validate([
            'comment' => 'required|string|max:255',
            'ticket_id' => 'required|exists:tickets,id',
        ]);

        // Get the currently authenticated user's ID
        $userId = Auth::id();

        // Create a new comment with the authenticated user's ID
        $comment = Comment::create([
            'comment' => $request->input('comment'),
            'ticket_id' => $request->input('ticket_id'),
            'user_id' => $userId,  // Store the logged-in user's ID
        ]);

        // Fetch updated ticket data (optional)

        $tickets = Ticket::with(['categories', 'labels', 'attachments', 'comments'])
            ->where(function ($query) use ($userId) {
                $query->where('user_id', $userId)
                    ->orWhere('agent_id', $userId);
            })
            ->get();

        // return Inertia::render('ViewTicket', [
        //     'tickets' => $tickets,
        //     'successMessage' => 'Comment added successfully!',
        // ]);
        return redirect()->route('tickets.index')->with('successMessage', 'Comment added successfully!');

    }
    public function agentTickets()
    {
        $agentId = Auth::id();

        // Fetch tickets where the agent is assigned (agent_id), with related data
        $tickets = Ticket::with(['categories', 'labels', 'attachments', 'comments.user'])
            ->where('agent_id', $agentId)
            ->get();

        return Inertia::render('Agent/Dashboard', [
            'tickets' => $tickets,
            'successMessage' => 'yay',
        ]);
    }

    public function agentstore(Request $request)
    {
        // Validate the input
        $validated = $request->validate([
            'comment' => 'required|string|max:255',
            'ticket_id' => 'required|exists:tickets,id',
        ]);

        // Get the currently authenticated user's ID
        $userId = Auth::id();

        // Create a new comment with the authenticated user's ID
        $comment = Comment::create([
            'comment' => $request->input('comment'),
            'ticket_id' => $request->input('ticket_id'),
            'user_id' => $userId,  // Store the logged-in user's ID
        ]);

        // Fetch updated ticket data (optional)

        $tickets = Ticket::with(['categories', 'labels', 'attachments', 'comments'])
            ->where(function ($query) use ($userId) {
                $query->where('user_id', $userId)
                    ->orWhere('agent_id', $userId);
            })
            ->get();

        // return Inertia::render('ViewTicket', [
        //     'tickets' => $tickets,
        //     'successMessage' => 'Comment added successfully!',
        // ]);
        return redirect()->route('agent.dashboard')->with('successMessage', 'Comment added successfully!');

    }

}
