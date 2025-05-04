<?php
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminTicketController;
use App\Http\Controllers\Admin\AdminAgentController;
use App\Http\Controllers\Admin\AdminUserController;

use App\Http\Controllers\CreateTicketController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



// Public Welcome Page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// User Dashboard - No Role Middleware needed
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Create Ticket
    Route::get('/createticket', [CreateTicketController::class, 'create'])->name('createticket');
    Route::post('/createticket/store', [CreateTicketController::class, 'store'])->name('ticket.store');

    // View Ticket
    Route::get('/viewticket/{id}', [CreateTicketController::class, 'view'])->name('ticket.view');

    // Tickets List
    Route::get('/tickets', [CreateTicketController::class, 'index'])->name('tickets.index');
    Route::get('/tickets/{id}', [CreateTicketController::class, 'view'])->name('tickets.view');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {

    // Admin Dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Tickets Management
    Route::get('/tickets', [AdminTicketController::class, 'index'])->name('tickets');
    Route::delete('/tickets/{id}', [AdminTicketController::class, 'destroy'])->name('tickets.destroy');

    // Agents Management
    Route::get('/agents', [AdminAgentController::class, 'index'])->name('agents');
    Route::post('/tickets/{id}/assign', [AdminTicketController::class, 'assignAgent'])->name('tickets.assign');

    // Users Management
    Route::get('/users', [AdminUserController::class, 'index'])->name('users');

    // 👇 Add these two for user actions
    Route::delete('/users/{id}', [AdminUserController::class, 'destroy'])->name('users.destroy');
    Route::post('/users/{id}/promote', [AdminUserController::class, 'promoteToAgent'])->name('users.promote');
    Route::delete('/agents/{id}', [AdminAgentController::class, 'destroy'])->name('agents.destroy');
});
// Agent Routes - Role-based access via middleware
Route::middleware(['auth', 'verified', 'role:agent'])->group(function () {
    Route::get('/agent/dashboard', function () {
        return Inertia::render('Agent/Dashboard');
    })->name('agent.dashboard');
});

// Profile Routesxa
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__ . '/auth.php';


