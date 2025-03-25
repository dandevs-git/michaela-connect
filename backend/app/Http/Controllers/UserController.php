<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UserController extends Controller
{

    private function generateUsername($name)
    {
        $baseUsername = Str::slug($name, '_');

        $suffix = mt_rand(100, 999);

        $username = "{$baseUsername}_{$suffix}";

        while (User::where('username', $username)->exists()) {
            $suffix = mt_rand(100, 999);
            $username = "{$baseUsername}_{$suffix}";
        }

        return $username;
    }

    public function index()
    {
        $users = User::with('department', 'roles')->get();
        return response()->json($users, 200);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rfid' => 'required|string|unique:users,rfid|max:20',
            'name' => 'required|string|max:255',
            'role' => ['required', Rule::in(['staff', 'head', 'manager', 'admin'])],
            'department_id' => 'required|exists:departments,id',
        ]);

        $admin = Auth::user();

        if ($validator->fails()) {
            logActivity(
                $admin->id,
                "User Management",
                'User Registration Failed',
                "User registration failed for {$request->name} by Admin {$admin->username}. Reason: " . json_encode($validator->errors()->all())
            );
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $username = $this->generateUsername($request->name);

        $password = Str::random(12);

        $user = User::create([
            'name' => $request->name,
            'username' => $username,
            'rfid' => $request->rfid,
            'password' => Hash::make($password),
            'role' => $request->role,
            'department_id' => $request->department_id,
            'status' => 'active',
        ]);

        $user->assignRole($request->role);

        logActivity(
            $admin->id,
            "User Management",
            'User Created',
            "Admin {$admin->username} created account for {$user->username} with RFID: {$request->rfid}."
        );

        return response()->json([
            'message' => 'User created successfully',
            'user' => [
                'username' => $user->username,
                'rfid' => $user->rfid,
                'password' => $password,
            ],
        ]);
    }


    public function show(User $user)
    {
        return response()->json($user, 200);
    }

    public function lockUnlockUser($id)
    {
        $user = User::findOrFail($id);
        $user->status = $user->status === 'locked' ? 'active' : 'locked';
        $user->save();

        $action = $user->status === 'locked' ? 'locked' : 'unlocked';
        $admin = Auth::user();

        logActivity(
            $admin->id,
            "User Management",
            "User {$action}",
            "Admin {$admin->username} {$action} user {$user->username}.",
        );

        return response()->json(['message' => "User {$user->username} is now {$user->status}"]);
    }

    // Admin: Delete a user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        $admin = Auth::user();

        logActivity(
            $admin->id,
            "User Management",
            "User Deleted",
            "Admin {$admin->username} permanently deleted user {$user->username}.",
        );

        return response()->json(['message' => 'User deleted successfully']);
    }

    // Temporary
    public function checkUserRole()
    {
        $user = User::find(1);
        return response()->json([
            'username' => $user->username,
            'roles' => $user->getRoleNames(),
            'is_admin' => $user->hasRole('admin'),
            'is_manager' => $user->hasRole('manager'),
            'is_head' => $user->hasRole('head'),
            'is_staff' => $user->hasRole('staff'),
        ], 200);
    }
}
