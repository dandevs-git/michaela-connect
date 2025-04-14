<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Invalid username'
            ], 401);
        }

        if ($user->status === 'locked') {
            logActivity(
                $user->id,
                'Authentication',
                'Account Locked',
                "User {$user->username} account is locked due to multiple failed login attempts."
            );

            return response()->json([
                'message' => 'Your account is temporarily locked due to multiple failed login attempts.'
            ], 403);
        }

        if (!Hash::check($request->password, $user->password)) {
            $user->increment('failed_attempts');

            if ($user->failed_attempts >= 5) {
                $user->update(['status' => 'locked']);
                logActivity(
                    $user->id,
                    'Authentication',
                    'Account Locked',
                    "User {$user->username} account temporarily locked due to too many failed login attempts."
                );

                return response()->json([
                    'message' => 'Your account has been temporarily locked due to too many failed attempts.'
                ], 403);
            }

            logActivity(
                $user->id,
                'Authentication',
                'Failed Login',
                "Failed login attempt for {$user->username} from IP: {$request->ip()} on " . gethostname() . ". Reason: Incorrect password."
            );

            return response()->json([
                'message' => 'Invalid password'
            ], 401);
        }

        $user->update([
            'failed_attempts' => 0,
            'status' => 'active'
        ]);

        if (Hash::check('michaela', $user->password)) {
            logActivity(
                $user->id,
                'Authentication',
                'Default Password Used',
                "User {$user->username} logged in using the default password. Prompting for password change."
            );
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // $request->session()->regenerate();

        logActivity(
            $user->id,
            'Authentication',
            'Successful Login',
            "User {$user->username} logged in successfully from IP: {$request->ip()} on " . gethostname() . "."
        );

        return response()->json([
            'message' => '',
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'User not authenticated'
            ], 401);
        }

        // $request->session()->invalidate();
        // $request->session()->regenerateToken();

        $user->tokens()->delete();

        logActivity(
            $user->id,
            'Authentication',
            'Logout',
            "User {$user->username} logged out successfully from IP: {$request->ip()} on " . gethostname() . "."
        );

        return response()->json([
            'message' => 'Logged out successfully'
        ], 200);
    }
}