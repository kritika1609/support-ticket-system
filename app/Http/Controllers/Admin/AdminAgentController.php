<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

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
}
