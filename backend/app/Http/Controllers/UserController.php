<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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

        $name = "{$baseUsername}_{$suffix}";

        while (User::where('name', $name)->exists()) {
            $suffix = mt_rand(100, 999);
            $name = "{$baseUsername}_{$suffix}";
        }

        return $name;
    }

    public function index()
    {
        $users = User::with('department', 'telephone', 'printer', 'anydesk', 'ipAddress', 'roles.permissions')->latest()->get();

        $filteredUsers = $users->filter(function ($user) {
            return !$user->getRoleNames()->contains('superadmin');
        });

        return response()->json($filteredUsers->values(), 200);
    }

    public function store(Request $request)
    {
        $admin = Auth::user();

        $validator = Validator::make($request->all(), [
            'rfid' => 'required|string|unique:users,rfid|max:20',
            'name' => 'required|string|max:255',
            'department_id' => 'required|exists:departments,id',
            'role' => 'required|string|exists:roles,name',
            'position' => 'required|string|max:255',
        ]);


        if ($validator->fails()) {
            logActivity(
                $admin->id,
                "User Management",
                'User Registration Failed',

                "User registration failed for {$request->name} by Admin {$admin->name}. Reason: " . json_encode($validator->errors()->all())
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
            'position' => $request->position,
            'department_id' => $request->department_id,
            'status' => 'active',
        ]);


        $user->assignRole($request->role);

        logActivity(
            $admin->id,
            "User Management",
            'User Created',
            "Admin {$admin->name} created account for {$user->name} with RFID: {$request->rfid}."
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
        $user->load('department', 'telephone', 'printer', 'anydesk', 'ipAddress', 'roles.permissions');
        return response()->json($user, 200);
    }


    public function lockUnlockUser($id)
    {
        $user = User::findOrFail($id);
        $user->status = $user->status === 'locked' ? 'active' : 'locked';
        $user->save();

        $action = $user->status === 'locked' ? 'lock' : 'unlock';
        $admin = Auth::user();

        logActivity(
            $admin->id,
            "User Management",
            "User {$action}",
            "Admin {$admin->name} {$action} user {$user->name}.",
        );

        return response()->json(['message' => "Employee {$user->name} is now {$user->status}"]);
    }

    public function suspendReinstateUser($id)
    {
        $user = User::findOrFail($id);
        $user->status = $user->status === 'suspended' ? 'active' : 'suspended';
        $user->save();

        $action = $user->status === 'suspended' ? 'suspend' : 'reinstate';
        $admin = Auth::user();

        logActivity(
            $admin->id,
            "User Management",
            "User {$action}",
            "Admin {$admin->name} {$action} user {$user->name}.",
        );

        return response()->json(['message' => "User {$user->name} is now {$user->status}"]);
    }


    public function deactivateActivateUser($id)
    {
        $user = User::findOrFail($id);
        $user->status = $user->status === 'inactive' ? 'active' : 'inactive';
        $user->save();

        $action = $user->status === 'inactive' ? 'deactivate' : 'activate';
        $admin = Auth::user();

        logActivity(
            $admin->id,
            "User Management",
            "User {$action}",
            "Admin {$admin->name} {$action} user {$user->name}.",
        );

        return response()->json(['message' => "User {$user->name} is now {$user->status}"]);
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
            "Admin {$admin->name} permanently deleted user {$user->name}.",
        );

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function getAuthUser()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user->load('department', 'roles.permissions');

        $role = $user->roles->first();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username,
            'position' => $user->position,
            'email' => $user->email,
            'profile_picture' => $user->profile_picture,
            'status' => $user->status,
            'department' => $user->department ? [
                'id' => $user->department->id,
                'name' => $user->department->name,
            ] : null,
            'role' => $user->roles ? [
                'id' => $role->id,
                'name' => $role->name,
            ] : null,
            'all_permissions' => $user->getAllPermissions()->pluck('name'),
            'created_at' => $user->created_at->toDateTimeString(),
            'updated_at' => $user->updated_at->toDateTimeString(),
        ]);
    }

    public function getSupervisor()
    {
        $user = Auth::user();

        $supervisor = $user->supervisor();

        return $supervisor
            ? response()->json($supervisor->load('department'), 200)
            : response()->json(['message' => 'No supervisor found'], 200);
    }

    public function getSubordinates()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $subordinates = $user->allSubordinates();

        if ($subordinates->isEmpty()) {
            return response()->json(['message' => 'No subordinates found'], 200);
        }

        return response()->json($subordinates->load('department'), 200);
    }
}
