<?php

namespace Database\Seeders;

use App\Models\Anydesk;
use App\Models\Department;
use App\Models\DirectoryCategory;
use App\Models\DirectoryEntry;
use App\Models\Internet;
use App\Models\IpAddress;
use App\Models\Printer;
use App\Models\Telephone;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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
        DB::table('priorities')->insert([
            ['name' => 'Low', 'response_time' => 480, 'resolution_time' => 8640],  // 8 hours, 6 days
            ['name' => 'Medium', 'response_time' => 240, 'resolution_time' => 4320], // 4 hours, 3 days
            ['name' => 'High', 'response_time' => 60, 'resolution_time' => 720], // 1 hour, 12 hours
            ['name' => 'Urgent', 'response_time' => 15, 'resolution_time' => 240], // 15 min, 4 hours
        ]);

        Department::factory()->count(6)->create();
        Telephone::factory()->count(10)->create();
        Internet::factory()->count(10)->create();
        IpAddress::factory()->count(10)->create();
        Anydesk::factory()->count(10)->create();
        Printer::factory()->count(10)->create();

        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $managerRole = Role::firstOrCreate(['name' => 'manager', 'guard_name' => 'web']);
        $headRole = Role::firstOrCreate(['name' => 'head', 'guard_name' => 'web']);
        $staffRole = Role::firstOrCreate(['name' => 'staff', 'guard_name' => 'web']);

        $admin = User::create([
            'rfid' => '0000000000',
            'name' => 'Admin',
            'username' => 'admin',
            'password' => Hash::make('110686'),
            'role' => $adminRole->name,
            'status' => 'active',
            'department_id' => 1,
        ]);

        $manager = User::create([
            'rfid' => '0000000001',
            'name' => 'Manager',
            'username' => 'manager',
            'password' => Hash::make('110686'),
            'role' => $managerRole->name,
            'status' => 'active',
            'department_id' => 2,
        ]);

        $head = User::create([
            'rfid' => '0000000002',
            'name' => 'Head',
            'username' => 'head',
            'password' => Hash::make('110686'),
            'role' => $headRole->name,
            'status' => 'active',
            'department_id' => 3,
        ]);

        $staff = User::create([
            'rfid' => '0000000003',
            'name' => 'Staff',
            'username' => 'staff',
            'password' => Hash::make('110686'),
            'role' => $staffRole->name,
            'status' => 'active',
            'department_id' => 4,
        ]);

        $admin->assignRole($adminRole);
        $manager->assignRole($managerRole);
        $head->assignRole($headRole);
        $staff->assignRole($staffRole);

        $manageUsers = Permission::firstOrCreate(['name' => 'manage users', 'guard_name' => 'web']);
        $createTickets = Permission::firstOrCreate(['name' => 'create tickets', 'guard_name' => 'web']);
        $approveTickets = Permission::firstOrCreate(['name' => 'approve tickets', 'guard_name' => 'web']);

        $adminRole->givePermissionTo([$manageUsers, $createTickets, $approveTickets]);
    }
}
