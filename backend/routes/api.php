<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [PasswordController::class, 'requestReset']);
Route::post('/reset-password', [PasswordController::class, 'resetPassword']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::put('/profile', [ProfileController::class, 'updateProfile']);

    Route::post('/change-password', [PasswordController::class, 'changePassword']);

    Route::get('/role', [UserController::class, 'checkUserRole']);

    Route::apiResource('tickets', TicketController::class);

    Route::middleware(['role:admin'])->group(function () {
        Route::apiResource('/users', UserController::class);
        Route::apiResource('/roles', RoleController::class);
        Route::patch('/users/{id}/lock', [UserController::class, 'lockUnlockUser']);
        Route::get('/logs', [ActivityLogController::class, 'index']);
        Route::post('/admin-reset-password/{id}', [PasswordController::class, 'adminResetPassword']);
    });
});
