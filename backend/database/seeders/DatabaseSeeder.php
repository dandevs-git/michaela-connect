<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\DirectoryCategory;
use App\Models\DirectoryEntry;
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
            'name' => 'Admin',
            'username' => 'admin',
            'password' => Hash::make('110686'),
            'role' => 'admin',
            'status' => 'active',
            'department_id' => 1,
        ]);

        $manager = User::create([
            'rfid' => '0000000001',
            'name' => 'Manager',
            'username' => 'manager',
            'password' => Hash::make('110686'),
            'role' => 'manager',
            'status' => 'active',
            'department_id' => 2,
        ]);

        $head = User::create([
            'rfid' => '0000000002',
            'name' => 'Head',
            'username' => 'head',
            'password' => Hash::make('110686'),
            'role' => 'head',
            'status' => 'active',
            'department_id' => 3,
        ]);

        $staff = User::create([
            'rfid' => '0000000003',
            'name' => 'Staff',
            'username' => 'staff',
            'password' => Hash::make('110686'),
            'role' => 'staff',
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

        $categories = ['Printers', 'PC Names', 'IP Addresses', 'Telephones', 'Anydesk', 'Cables'];

        // foreach ($categories as $category) {
        //     $categoryModel = DirectoryCategory::create(['name' => $category]);

        //     DirectoryEntry::factory(5)->create(['category_id' => $categoryModel->id]);
        // }
    }
}
