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
            'superadmin' => [
                //FIX PERMISSIONS

                // Directories
                'view it directory',
                'view it assets',

                // Tickets
                'delete tickets',
            ],
            'admin' => [

                // User Management
                'manage users',
                'manage roles',
                'view activity logs',

                // Ticket Permissions
                'create tickets',
                'view tickets',
                'update tickets',


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


                //FIX PERMISSIONS

                // Side Navigation
                'view dashboard',
                'access service desk',
                'manage employees',
                'view general directory',
                'view analytics reports',
                'manage system settings',

                // Role-based Insights
                'view all tickets',
            ],

            'manager' => [

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


                //FIX PERMISSIONS

                // Side Navigation
                'view dashboard',
                'access service desk',
                'view general directory',

                // Role-based Insights
                'view managed department tickets',
            ],

            'head' => [
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


                //FIX PERMISSIONS

                // Side Navigation
                'view dashboard',
                'access service desk',
                'view general directory',

                // Role-based Insights
                'view own department tickets',
            ],

            'staff' => [
                'create tickets',
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


                //FIX PERMISSIONS

                // Side Navigation
                'view dashboard',
                'access service desk',
                'view general directory',

                // Role-based Insights
                'view own department tickets',
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
