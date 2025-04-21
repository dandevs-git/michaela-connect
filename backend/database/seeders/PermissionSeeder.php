<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // 🛡️ Permissions
        $permissions = [
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
            'view department tickets',
            'view own department tickets',
            'view own tickets',

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
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions(Permission::all());

        $manager = Role::firstOrCreate(['name' => 'manager']);
        $manager->syncPermissions([
            'view department tickets',
            'assign tickets',
            'comment on tickets',
            'view SLA reports',
            'view ticket analytics',
        ]);

        $head = Role::firstOrCreate(['name' => 'head']);
        $head->syncPermissions([
            'view own department tickets',
            'approve tickets',
            'comment on tickets',
        ]);

        $staff = Role::firstOrCreate(['name' => 'staff']);
        $staff->syncPermissions([
            'create tickets',
            'view own tickets',
            'comment on tickets',
            'upload attachments',
            'receive notifications',
        ]);
    }
}
