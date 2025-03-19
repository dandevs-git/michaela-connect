<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Department::factory()->count(6)->create();

        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $managerRole = Role::firstOrCreate(['name' => 'manager', 'guard_name' => 'web']);
        $headRole = Role::firstOrCreate(['name' => 'head', 'guard_name' => 'web']);
        $staffRole = Role::firstOrCreate(['name' => 'staff', 'guard_name' => 'web']);

        $admin = User::create([
            'rfid' => '0000000000',
            'name' => 'Super Admin',
            'username' => 'admin',
            'password' => Hash::make('110686'),
            'role' => 'admin',
            'status' => 'active',
            'department_id' => 1,
        ]);

        $admin->assignRole($adminRole);

        $manageUsers = Permission::firstOrCreate(['name' => 'manage users', 'guard_name' => 'web']);
        $createTickets = Permission::firstOrCreate(['name' => 'create tickets', 'guard_name' => 'web']);
        $approveTickets = Permission::firstOrCreate(['name' => 'approve tickets', 'guard_name' => 'web']);

        $adminRole->givePermissionTo([$manageUsers, $createTickets, $approveTickets]);
    }
}
