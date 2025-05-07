<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;

class AdminAgentController extends Controller
{
    public function index()
    {
        $agents = User::where('role_id', 2)->get();

        return Inertia::render('Admin/AdminAgents', [
            'agents' => $agents
        ]);
    }

    public function destroy($id)
    {
        $agent = User::where('role_id', 2)->findOrFail($id);
        $agent->delete();

        return redirect()->route('admin.agents')->with('success', 'Agent removed successfully.');
    }
    public function trashed()
    {
        $trashedAgents = User::onlyTrashed()
            ->where('role_id', 2) // Assuming role_id 2 is for agents
            ->get();

        return Inertia::render('Admin/TrashedAgents', [
            'agents' => $trashedAgents,
        ]);
    }

    public function restore($id)
    {
        $agent = User::withTrashed()->findOrFail($id); // Fetch the soft deleted agent
        $agent->restore(); // Restore the agent
        return Redirect::route('admin.agents.trashed')->with('success', 'Agent has been restored!');
    }

    public function forceDelete($id)
    {
        $agent = User::withTrashed()->findOrFail($id);
        $agent->forceDelete();

        return Redirect::route('admin.agents.trashed')->with('success', 'Agent permanently deleted!');
    }
}
