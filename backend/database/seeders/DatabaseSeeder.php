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

        DB::table('priorities')->insert([
            ['name' => 'Low', 'response_time' => 480, 'resolution_time' => 8640],
            ['name' => 'Medium', 'response_time' => 240, 'resolution_time' => 4320],
            ['name' => 'High', 'response_time' => 60, 'resolution_time' => 720],
            ['name' => 'Urgent', 'response_time' => 15, 'resolution_time' => 240],
        ]);

        Telephone::factory()->count(10)->create();
        Internet::factory()->count(10)->create();
        IpAddress::factory()->count(10)->create();
        Anydesk::factory()->count(10)->create();
        Printer::factory()->count(10)->create();

        Department::factory()->count(3)->create();
        Department::factory()->count(5)->withParent()->create();

        $departmentId = Department::first()->id ?? 1;

        $roles = [
            'superadmin' => Role::firstOrCreate(['name' => 'superadmin']),
            'admin' => Role::firstOrCreate(['name' => 'admin']),
            'manager' => Role::firstOrCreate(['name' => 'manager']),
            'head' => Role::firstOrCreate(['name' => 'head']),
            'staff' => Role::firstOrCreate(['name' => 'staff']),
        ];

        $superadmin = User::create([
            'rfid' => '1111111111',
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'password' => Hash::make('110686'),
            'role' => 'superadmin',
            'status' => 'active',
            'department_id' => $departmentId,
        ]);
        $superadmin->assignRole($roles['superadmin']);

        $admin = User::create([
            'rfid' => '0000000000',
            'name' => 'Admin',
            'username' => 'admin',
            'password' => Hash::make('110686'),
            'role' => 'admin',
            'status' => 'active',
            'department_id' => $departmentId,
        ]);
        $admin->assignRole($roles['admin']);

        $manager = User::create([
            'rfid' => '0000000001',
            'name' => 'Manager',
            'username' => 'manager',
            'password' => Hash::make('110686'),
            'role' => 'manager',
            'status' => 'active',
            'department_id' => $departmentId,
        ]);
        $manager->assignRole($roles['manager']);

        $head = User::create([
            'rfid' => '0000000002',
            'name' => 'Head',
            'username' => 'head',
            'password' => Hash::make('110686'),
            'role' => 'head',
            'status' => 'active',
            'department_id' => $departmentId,
        ]);
        $head->update(['head_id' => $head->id]);
        $head->assignRole($roles['head']);

        for ($i = 10; $i < 20; $i++) {
            $staff = User::create([
                'rfid' => str_pad($i, 10, '0', STR_PAD_LEFT),
                'name' => "Staff $i",
                'username' => "staff$i",
                'password' => Hash::make('110686'),
                'role' => 'staff',
                'status' => 'active',
                'department_id' => $departmentId,
                'head_id' => $head->id,
            ]);
            $staff->assignRole($roles['staff']);
        }

        Ticket::factory()->count(100)->create();
    }
}
