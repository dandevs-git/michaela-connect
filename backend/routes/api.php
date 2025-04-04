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


    Route::get('/tickets/status', [TicketController::class, 'ticketStatusData']);
    Route::get('/tickets/trends', [TicketController::class, 'ticketVolumeTrends']);
    Route::get('/tickets/departments', [TicketController::class, 'departmentResolutionTime']);


    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
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

    Route::prefix('tickets/{ticket}')->group(function () {
        Route::post('/approve', [TicketController::class, 'approve'])->name('tickets.approve');
        Route::post('/reject', [TicketController::class, 'reject'])->name('tickets.reject');
        Route::post('/assign', [TicketController::class, 'assign'])->name('tickets.assign');
        Route::post('/start', [TicketController::class, 'startTask'])->name('tickets.start');
        Route::post('/status', [TicketController::class, 'updateStatus'])->name('tickets.status');
        Route::post('/verify', [TicketController::class, 'verifyResolution'])->name('tickets.verify');
        Route::post('/close', [TicketController::class, 'close'])->name('tickets.close');

        Route::prefix('/comments')->group(function () {
            Route::post('/', [TicketController::class, 'addComment'])->name('tickets.comments.add');
            Route::get('/', [TicketController::class, 'getComments'])->name('tickets.comments.list');
        });
    });

    Route::prefix('/comments/{comment}')->group(function () {
        Route::put('/', [TicketController::class, 'editComment'])->name('comments.edit');
        Route::delete('/', [TicketController::class, 'deleteComment'])->name('comments.delete');
    });

    Route::middleware(['role:admin'])->group(function () {
        Route::apiResources([
            'users' => UserController::class,
            'roles' => RoleController::class,
        ]);
        Route::get('/users/{id}/subordinates', [UserController::class, 'getSubordinates']);
        Route::patch('/users/{id}/lock', [UserController::class, 'lockUnlockUser'])->name('users.lock');
        Route::post('/admin-reset-password/{id}', [PasswordController::class, 'adminResetPassword'])->name('password.adminReset');

        Route::get('/logs', [ActivityLogController::class, 'index'])->name('logs.index');

        Route::prefix('/comments/{comment}')->group(function () {
            Route::post('/restore', [TicketController::class, 'restoreComment'])->name('comments.restore');
            Route::delete('/force-delete', [TicketController::class, 'forceDeleteComment'])->name('comments.forceDelete');
        });
    });
});
