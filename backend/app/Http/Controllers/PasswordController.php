<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class PasswordController extends Controller
{
    public function requestReset(Request $request)
    {
        $request->validate([
            'username' => 'required|exists:users,username',
        ]);

        try {
            $token = Str::random(60);
            DB::table('password_reset_tokens')->updateOrInsert(
                ['username' => $request->username],
                ['token' => $token, 'created_at' => now()]
            );

            logActivity(
                User::where('username', $request->username)->value('id'),
                'Authentication',
                'Password Reset Requested',
                "Password reset request initiated for {$request->username}."
            );

            return response()->json([
                'message' => 'Password reset request received. Use your reset token.',
                'token' => $token // Display kolang po para sa testing
            ]);
        } catch (\Exception $e) {
            logActivity(
                User::where('username', $request->username)->value('id'),
                'Authentication',
                'Password Reset Request Failed',
                "Password reset request failed for {$request->username}. Error: {$e->getMessage()}"
            );

            return response()->json(['message' => 'An error occurred while processing your request.'], 500);
        }
    }

    /**
     * Reset password using token
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        try {
            $resetData = DB::table(config('auth.passwords.users.table'))
                ->where('token', $request->token)
                ->first();

            $expiration = config('auth.passwords.users.expire');
            $tokenExpired = $resetData && Carbon::parse($resetData->created_at)->addMinutes($expiration)->isPast();

            if (!$resetData || $tokenExpired) {
                return response()->json(['message' => 'Invalid or expired reset token'], 400);
            }

            $user = User::where('username', $resetData->username)->firstOrFail();
            $user->update(['password' => Hash::make($request->password)]);

            DB::table(config('auth.passwords.users.table'))->where('token', $request->token)->delete();

            logActivity(
                $user->id,
                'Authentication',
                'Password Reset Successful',
                "User {$user->username} successfully reset their password."
            );

            return response()->json(['message' => 'Password reset successful.']);
        } catch (\Exception $e) {
            $user = User::where('username', $request->username)->value('id');
            logActivity(
                $user->id,
                'Authentication',
                'Password Reset Successful',
                "User {$user->username} successfully reset their password."
            );

            return response()->json(['message' => 'An error occurred while resetting the password.'], 500);
        }
    }


    /**
     * Admin resets password for a user
     */
    public function adminResetPassword(Request $request, $id)
    {
        $request->validate([
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::findOrFail($id);
        $admin = Auth::user();
        $user->update(['password' => Hash::make($request->password)]);

        logActivity(
            $admin->id,
            'Authentication',
            'Admin Password Reset',
            "Admin {$admin->username} reset password for user {$user->username}."
        );

        return response()->json(['message' => "User {$user->username}'s password has been reset."]);
    }

    /**
     * User changes their own password
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect.'], 400);
        }

        $user->update(['password' => Hash::make($request->new_password)]);

        logActivity(
            $user->id,
            'Authentication',
            'Password Changed',
            "User {$user->username} changed their password."
        );

        return response()->json(['message' => 'Password changed successfully.']);
    }
}
