<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Ticket;
use Inertia\Inertia;
use Illuminate\Http\Request;
class AgentDashboardController extends Controller
{
    public function index(Request $request)
    {
        $agentId = Auth::id();

        // Get sorting and filtering parameters
        $priority = $request->get('priority');
        $statusFilter = $request->get('status_filter');

        // Start the query for tickets
        $query = Ticket::where(function ($query) use ($agentId) {
            // Tickets where the agent is assigned
            $query->where('agent_id', $agentId)
                ->orWhere('user_id', Auth::id()); // Or tickets where the current user (could be a user) is involved
        })
            ->with(['categories', 'labels', 'attachments', 'comments.user']); // Eager load comments with user info

        // Apply priority filter if set
        if ($priority) {
            $query->where('priority', $priority);
        }

        // Apply status filter if set
        if ($statusFilter) {
            if ($statusFilter === 'closed') {
                $query->where('status', 'closed');
            } elseif ($statusFilter === 'not_closed') {
                $query->where('status', '!=', 'closed');
            }
        }

        // Apply sorting based on priority or status
        if ($request->get('sort_by')) {
            $sortBy = $request->get('sort_by');

            switch ($sortBy) {
                case 'priority':
                    $query->orderBy('priority');
                    break;
                case 'status':
                    $query->orderBy('status');
                    break;
                case 'recent':
                    $query->latest();
                    break;
                default:
                    $query->latest();
                    break;
            }
        }

        // Fetch tickets with applied filters and sorting
        $tickets = $query->get();

        // Return the view with tickets and comments data
        return Inertia::render('Agent/Dashboard', [
            'tickets' => $tickets,
        ]);
    }



    public function close(Ticket $ticket)
    {
        if ($ticket->agent_id !== auth()->id()) {
            abort(403, 'Unauthorized'); // Prevent closing other agents' tickets
        }

        $ticket->status = 'closed';
        $ticket->save();

        return redirect()->route('agent.dashboard')->with('success', 'Ticket closed!');
    }


}
