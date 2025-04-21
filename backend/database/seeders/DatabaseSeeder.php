<?php

namespace Database\Seeders;

use App\Models\Anydesk;
use App\Models\Department;
use App\Models\Internet;
use App\Models\IpAddress;
use App\Models\Printer;
use App\Models\Telephone;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(PermissionSeeder::class);

        // Seed priorities
        DB::table('priorities')->insert([
            ['name' => 'Low', 'response_time' => 480, 'resolution_time' => 8640],
            ['name' => 'Medium', 'response_time' => 240, 'resolution_time' => 4320],
            ['name' => 'High', 'response_time' => 60, 'resolution_time' => 720],
            ['name' => 'Urgent', 'response_time' => 15, 'resolution_time' => 240],
        ]);

        // Factory seeders
        Department::factory()->count(6)->create();
        Telephone::factory()->count(10)->create();
        Internet::factory()->count(10)->create();
        IpAddress::factory()->count(10)->create();
        Anydesk::factory()->count(10)->create();
        Printer::factory()->count(10)->create();

        // Roles (created by PermissionSeeder)
        $adminRole = Role::where('name', 'admin')->first();
        $managerRole = Role::where('name', 'manager')->first();
        $headRole = Role::where('name', 'head')->first();
        $staffRole = Role::where('name', 'staff')->first();

        // Admins
        $admin = User::create([
            'rfid' => '0000000000',
            'name' => 'Admin',
            'username' => 'admin',
            'password' => Hash::make('110686'),
            'role' => $adminRole->name,
            'status' => 'active',
            'department_id' => 1,
        ]);
        $admin->assignRole($adminRole);

        $admin2 = User::create([
            'rfid' => '0000000100',
            'name' => 'Admin2',
            'username' => 'admin2',
            'password' => Hash::make('110686'),
            'role' => $adminRole->name,
            'status' => 'active',
            'department_id' => 1,
        ]);
        $admin2->assignRole($adminRole);

        // Manager
        $manager = User::create([
            'rfid' => '0000000001',
            'name' => 'Manager',
            'username' => 'manager',
            'password' => Hash::make('110686'),
            'role' => $managerRole->name,
            'status' => 'active',
            'department_id' => 1,
        ]);
        $manager->assignRole($managerRole);

        // Head
        $head = User::create([
            'rfid' => '0000000002',
            'name' => 'Head',
            'username' => 'head',
            'password' => Hash::make('110686'),
            'role' => $headRole->name,
            'status' => 'active',
            'department_id' => 1,
        ]);
        $head->update(['head_id' => $head->id]);
        $head->assignRole($headRole);

        // Staffs
        for ($i = 10; $i < 20; $i++) {
            $staff = User::create([
                'rfid' => str_pad($i, 10, '0', STR_PAD_LEFT),
                'name' => "Staff $i",
                'username' => "staff$i",
                'password' => Hash::make('110686'),
                'role' => $staffRole->name,
                'status' => 'active',
                'department_id' => 1,
                'head_id' => $head->id,
            ]);
            $staff->assignRole($staffRole);
        }

        // Sample tickets
        Ticket::factory()->count(100)->create();
    }
}
