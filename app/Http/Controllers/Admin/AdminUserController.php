<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;

class AdminUserController extends Controller
{
    public function index()
    {
        $users = User::where('role_id', 3)->get();
        return Inertia::render('Admin/AdminUsers', [
            'users' => $users
        ]);
    }

    public function destroy($id)
    {
        $user = User::where('role_id', 3)->findOrFail($id);
        $user->delete();
        return redirect()->route('admin.users')->with('success', 'User removed successfully.');
    }
    public function trashed()
    {
        $trashedUsers = User::onlyTrashed()
            ->where('role_id', 3) // Assuming role_id 2 is for agents
            ->get();

        return Inertia::render('Admin/TrashedUsers', [
            'users' => $trashedUsers,
        ]);
    }

    public function restore($id)
    {
        $user = User::withTrashed()->findOrFail($id); // Fetch the soft deleted agent
        $user->restore(); // Restore the agent
        return Redirect::route('admin.users.trashed')->with('success', 'User has been restored!');
    }

    public function forceDelete($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->forceDelete();

        return Redirect::route('admin.users.trashed')->with('success', 'User permanently deleted!');
    }

    public function promoteToAgent($id)
    {
        $user = User::findOrFail($id);
        $user->role_id = 2;
        $user->save();
        return back()->with('message', 'User promoted to agent.');
    }
}
