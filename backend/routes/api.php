<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\AnydeskController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\InternetController;
use App\Http\Controllers\IpAddressController;
use App\Http\Controllers\PrinterController;
use App\Http\Controllers\PriorityController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\TelephoneController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
Route::post('/forgot-password', [PasswordController::class, 'requestReset'])->name('password.forgot');
Route::post('/reset-password', [PasswordController::class, 'resetPassword'])->name('password.reset');

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'getDashboardData']);
    Route::get('/ticket-status-data', [DashboardController::class, 'ticketStatusData']);
    Route::get('/ticket-volume-trends', [DashboardController::class, 'ticketVolumeTrends']);
    Route::get('/department-resolution-time', [DashboardController::class, 'departmentResolutionTime']);

    Route::prefix('tickets')->group(function () {
        Route::get('/status', [TicketController::class, 'ticketStatusData']);
        Route::get('/trends', [TicketController::class, 'ticketVolumeTrends']);
        Route::get('/departments', [TicketController::class, 'departmentResolutionTime']);

        Route::post('{ticket}/approve', [TicketController::class, 'approve'])->name('tickets.approve');
        Route::post('{ticket}/reject', [TicketController::class, 'reject'])->name('tickets.reject');
        Route::post('{ticket}/assign', [TicketController::class, 'assign'])->name('tickets.assign');
        Route::post('{ticket}/start', [TicketController::class, 'startTask'])->name('tickets.start');
        Route::post('{ticket}/status', [TicketController::class, 'updateStatus'])->name('tickets.status');
        Route::post('{ticket}/verify', [TicketController::class, 'verifyResolution'])->name('tickets.verify');
        Route::post('{ticket}/close', [TicketController::class, 'close'])->name('tickets.close');

        Route::prefix('{ticket}/comments')->group(function () {
            Route::post('/', [TicketController::class, 'addComment'])->name('tickets.comments.add');
            Route::get('/', [TicketController::class, 'getComments'])->name('tickets.comments.list');
            Route::get('{comment}', [TicketController::class, 'getCommentShow'])->name('tickets.comments.show');
            Route::put('{comment}', [TicketController::class, 'editComment'])->name('tickets.comments.edit');
            Route::delete('{comment}', [TicketController::class, 'deleteComment'])->name('tickets.comments.delete');
            Route::post('{comment}/restore', [TicketController::class, 'restoreComment'])->name('tickets.comments.restore');
            Route::delete('{comment}/force-delete', [TicketController::class, 'forceDeleteComment'])->name('tickets.comments.forceDelete');
        });
    });

    Route::get('/logs', [ActivityLogController::class, 'index'])->name('logs.index');
    Route::get('/logs/ticket', [ActivityLogController::class, 'getTicketLogs'])->name('logs.ticket');

    Route::put('/profile', [ProfileController::class, 'updateProfile'])->name('profile.update');
    Route::post('/change-password', [PasswordController::class, 'changePassword'])->name('password.change');

    Route::get('/auth', [UserController::class, 'getAuthenticatedUserDetails'])->name('user.auth');

    Route::apiResources([
        'tickets' => TicketController::class,
        'departments' => DepartmentController::class,
        'priorities' => PriorityController::class,
        'telephones' => TelephoneController::class,
        'internet' => InternetController::class,
        'ipaddress' => IpAddressController::class,
        'anydesks' => AnydeskController::class,
        'printers' => PrinterController::class,
    ]);


    // Route::middleware(['role:head'])->group(function () {
    Route::get('/users/subordinates', [UserController::class, 'getSubordinates']);
    // });

    Route::middleware(['role:admin'])->group(function () {

        Route::apiResources([
            'users' => UserController::class,
            'roles' => RoleController::class,
        ]);
        Route::get('/users/{id}/subordinates', [UserController::class, 'getUserSubordinates']);
        Route::patch('/users/{id}/lock', [UserController::class, 'lockUnlockUser'])->name('users.lock');
        Route::post('/admin-reset-password/{id}', [PasswordController::class, 'adminResetPassword'])->name('password.adminReset');
    });

    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});
