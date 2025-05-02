<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role): Response
    {
        $user = $request->user();

        // Map string roles to role_id
        $roles = [
            'admin' => 1,
            'agent' => 2,
            'user' => 3,
        ];

        // If role name is invalid or user role doesn't match
        if (!isset($roles[$role]) || $user->role_id != $roles[$role]) {
            abort(403, 'Unauthorized access.');
        }

        return $next($request);
    }
}
