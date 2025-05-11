<?php
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminTicketController;
use App\Http\Controllers\Admin\AdminAgentController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Agent\AgentDashboardController;
use App\Http\Controllers\CreateTicketController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CommentController;

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
        $user = auth()->user();

        if ($user->role_id === 1) {
            return redirect()->route('admin.dashboard');
        } elseif ($user->role_id === 2) {
            return redirect()->route('agent.dashboard');
        }
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

    Route::post('/comments/store', [CommentController::class, 'store'])->name('comments.store');

});

//ADMIN
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {

    // Admin Dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Tickets Management
    Route::get('/tickets', [AdminTicketController::class, 'index'])->name('tickets');
    Route::delete('/tickets/{ticket}', [AdminTicketController::class, 'destroy'])->name('tickets.destroy');
    // Assign Agent to Ticket
    Route::post('/tickets/{id}/assign', [AdminTicketController::class, 'assignAgent'])->name('tickets.assign');

    // 👇 Soft Deleted Tickets Management
    Route::get('/tickets/trashed', [AdminTicketController::class, 'trashed'])->name('tickets.trashed');
    Route::post('/tickets/{id}/restore', [AdminTicketController::class, 'restore'])->name('tickets.restore');
    Route::delete('/tickets/{id}/force-delete', [AdminTicketController::class, 'forceDelete'])->name('tickets.forceDelete');

    // Agents Management
    Route::get('/agents', [AdminAgentController::class, 'index'])->name('agents');
    Route::delete('/agents/{id}', [AdminAgentController::class, 'destroy'])->name('agents.destroy');

    // 👇 Soft Deleted Agents Management
    Route::get('/agents/trashed', [AdminAgentController::class, 'trashed'])->name('agents.trashed');
    Route::post('/agents/{id}/restore', [AdminAgentController::class, 'restore'])->name('agents.restore');
    Route::delete('/agents/{id}/force-delete', [AdminAgentController::class, 'forceDelete'])->name('agents.forceDelete');

    // Users Management
    Route::get('/users', [AdminUserController::class, 'index'])->name('users');
    Route::delete('/users/{id}', [AdminUserController::class, 'destroy'])->name('users.destroy');
    Route::put('/users/{id}/promote', [AdminUserController::class, 'promoteToAgent'])->name('users.promote');

    // 👇 Soft Deleted Users Management
    Route::get('/users/trashed', [AdminUserController::class, 'trashed'])->name('users.trashed');
    Route::post('/users/{id}/restore', [AdminUserController::class, 'restore'])->name('users.restore');
    Route::delete('/users/{id}/force-delete', [AdminUserController::class, 'forceDelete'])->name('users.forceDelete');

});

// Agent Routes - Role-based access via middleware
Route::middleware(['auth', 'verified', 'role:agent'])->group(function () {
    Route::get('/agent/dashboard', [AgentDashboardController::class, 'index'])->name('agent.dashboard');
    Route::put('/agent/tickets/{ticket}/close', [AgentDashboardController::class, 'close'])->name('agent.tickets.close');
    Route::get('/agent/tickets', [CommentController::class, 'agentTickets'])->name('agent.tickets');
    Route::post('/agentcomments/store', [CommentController::class, 'agentstore'])->name('comments.store2');

});


// Profile Routesxa
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__ . '/auth.php';


