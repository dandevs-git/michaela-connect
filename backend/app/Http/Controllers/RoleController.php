<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Get all roles with their permissions.
     */
    public function index()
    {
        $roles = Role::with('permissions')->get();
        return response()->json($roles, 200);
    }

    /**
     * Store a new role with assigned permissions.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles',
            'permissions' => 'array',
        ]);

        $role = Role::create(['name' => $request->name]);

        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return response()->json(['message' => 'Role created', 'role' => $role], 201);
    }

    /**
     * Show a single role with permissions.
     */
    public function show(Role $role)
    {
        return response()->json($role->load('permissions'), 200);
    }

    /**
     * Update an existing role.
     */
    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|unique:roles,name,' . $role->id,
            'permissions' => 'array',
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return response()->json(['message' => 'Role updated', 'role' => $role]);
    }

    /**
     * Delete a role.
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return response()->json(['message' => 'Role deleted']);
    }
}
