<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
class AdminTicketController extends Controller
{
    public function index(Request $request)
    {
        $query = Ticket::with(['user:id,name', 'categories:id,name', 'labels:id,name', 'attachments:id,ticket_id,file_path', 'agent:id,name']);

        if ($request->filled('search')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('sort_by')) {
            switch ($request->get('sort_by')) {
                case 'status':
                    $query->orderBy('status');
                    break;
                case 'priority':
                    $query->orderBy('priority');
                    break;
                case 'agent':
                    $query->orderBy('agent_id');
                    break;
            }
        } else {
            $query->latest(); // Only apply this if no sort selected
        }

        $tickets = $query->paginate(10)->appends($request->only(['search', 'sort_by']));
        $agents = User::where('role_id', 2)->get();

        return Inertia::render('Admin/AdminTickets', [
            'tickets' => $tickets,
            'agents' => $agents,
            'filters' => $request->only(['search', 'sort_by']),
        ]);
    }

    public function assignAgent(Request $request, $id)
    {
        $request->validate([
            'agent_id' => 'required|exists:users,id',
        ]);

        $ticket = Ticket::findOrFail($id);
        $ticket->agent_id = $request->agent_id;
        $ticket->status = 'in_progress'; // or any other label you're using
        $ticket->save();

        return redirect()->back()->with('success', 'Agent assigned successfully.');
    }
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();
        return back()->with('success', 'Ticket moved to trash!');
    }
    public function trashed()
    {
        $trashedTickets = Ticket::onlyTrashed()->with('user')->get(); // eager load if needed
        return Inertia::render('Admin/TrashedTickets', [
            'tickets' => $trashedTickets,
        ]);
    }

    public function restore($id)
    {
        $ticket = Ticket::withTrashed()->findOrFail($id);
        $ticket->restore();

        return Redirect::route('admin.tickets.trashed')->with('success', 'Ticket restored!');
    }

    public function forceDelete($id)
    {
        $ticket = Ticket::withTrashed()->findOrFail($id);
        $ticket->forceDelete();

        return Redirect::route('admin.tickets.trashed')->with('success', 'Ticket permanently deleted!');
    }

}
