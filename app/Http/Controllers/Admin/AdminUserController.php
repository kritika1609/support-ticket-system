<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;


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
        $user = User::findOrFail($id);
        $user->delete();
        return back()->with('message', 'User removed successfully.');
    }

    public function promoteToAgent($id)
    {
        $user = User::findOrFail($id);
        $user->role_id = 2;
        $user->save();
        return back()->with('message', 'User promoted to agent.');
    }
}
