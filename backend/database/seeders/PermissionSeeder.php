<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $rolePermissions = [
            'superadmin' => [],
            'admin' => [
                // User Management
                'manage users',
                'manage roles',
                'view activity logs',

                // Ticket Permissions
                'create tickets',
                'view tickets',
                'update tickets',
                'delete tickets',

                // Role-based Viewing
                'view all tickets',

                // Ticket Actions
                'assign tickets',
                'approve tickets',
                'reject tickets',
                'close tickets',
                'escalate tickets',

                // Comments & History
                'comment on tickets',
                'view ticket comments',
                'view ticket history',

                // Attachments
                'upload attachments',
                'view attachments',
                'delete attachments',

                // Notifications
                'receive notifications',
                'send notifications',

                // SLA & Analytics
                'view SLA reports',
                'view ticket analytics',
                'view performance reports',

                // Departments
                'manage departments',
                'view departments',

                // System
                'manage settings',
                'manage system logs',

                // Service Desk Tabs
                'view all tickets tab',
                'view pending tickets tab',
                'view new tickets tab',
                'view open tickets tab',
                'view inprogress tickets tab',
                'view resolved tickets tab',
                'view closed tickets tab',
                'view failed tickets tab',
                'view rejected tickets tab',

                // Action Buttons
                'view ticket details',
            ],

            'manager' => [
                'view department tickets',
                'assign tickets',
                'comment on tickets',
                'view SLA reports',
                'view ticket analytics',

                // Tabs
                'view all tickets tab',
                'view pending tickets tab',
                'view new tickets tab',
                'view open tickets tab',
                'view inprogress tickets tab',
                'view resolved tickets tab',
                'view closed tickets tab',
                'view failed tickets tab',
                'view rejected tickets tab',
            ],

            'head' => [
                'view own department tickets',
                'approve tickets',
                'comment on tickets',
                'view ticket comments',
                'view ticket history',
                'receive notifications',

                // Tabs
                'view all tickets tab',
                'view new tickets tab',
                'view pending tickets tab',
                'view open tickets tab',
                'view inprogress tickets tab',
                'view resolved tickets tab',
                'view closed tickets tab',
            ],

            'staff' => [
                'create tickets',
                'view own department tickets',
                // 'view own tickets',
                'comment on tickets',
                'upload attachments',
                'view attachments',
                'receive notifications',

                // Tabs
                'view all tickets tab',
                'view open tickets tab',
                'view inprogress tickets tab',
                'view resolved tickets tab',
                'view closed tickets tab',
            ],
        ];

        $allPermissions = collect($rolePermissions)
            ->flatten()
            ->unique()
            ->values();

        foreach ($allPermissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        foreach ($rolePermissions as $role => $permissions) {
            $roleModel = Role::firstOrCreate(['name' => $role]);

            if ($role === 'superadmin') {
                $roleModel->syncPermissions(Permission::all());
            } else {
                $roleModel->syncPermissions($permissions);
            }
        }
    }
}
