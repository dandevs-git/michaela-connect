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


        $roles = [
            'superadmin' => Role::firstOrCreate(['name' => 'superadmin']),
            'admin' => Role::firstOrCreate(['name' => 'admin']),
            'manager' => Role::firstOrCreate(['name' => 'manager']),
            'head' => Role::firstOrCreate(['name' => 'head']),
            'staff' => Role::firstOrCreate(['name' => 'staff']),
        ];


        $departmentId = Department::first()->id ?? 1;

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

        for ($i = 1; $i < 10; $i++) {
            $admin = User::create([
                'rfid' => str_pad($i, 10, '0', STR_PAD_LEFT),
                'name' => "Admin $i",
                'username' => "admin$i",
                'password' => Hash::make('110686'),
                'role' => 'admin',
                'status' => 'active',
                'department_id' => Department::inRandomOrder()->value('id') ?? $departmentId,
            ]);
            $admin->assignRole($roles['admin']);
        }


        for ($i = 11; $i < 20; $i++) {
            $manager = User::create([
                'rfid' => str_pad($i, 10, '0', STR_PAD_LEFT),
                'name' => "Manager $i",
                'username' => "manager$i",
                'password' => Hash::make('110686'),
                'role' => 'manager',
                'status' => 'active',
                'department_id' => Department::whereNull('parent_id')->inRandomOrder()->value('id') ?? $departmentId,

            ]);
            $manager->assignRole($roles['manager']);
        }


        for ($i = 21; $i < 30; $i++) {
            $head = User::create([
                'rfid' => str_pad($i, 10, '0', STR_PAD_LEFT),
                'name' => "Head $i",
                'username' => "head$i",
                'password' => Hash::make('110686'),
                'role' => 'head',
                'status' => 'active',
                'department_id' => Department::inRandomOrder()->value('id') ?? $departmentId,
            ]);
            $head->update(['head_id' => $head->id]);
            $head->assignRole($roles['head']);
        }

        for ($i = 31; $i < 40; $i++) {
            $staff = User::create([
                'rfid' => str_pad($i, 10, '0', STR_PAD_LEFT),
                'name' => "Staff $i",
                'username' => "staff$i",
                'password' => Hash::make('110686'),
                'role' => 'staff',
                'status' => 'active',
                'department_id' => Department::inRandomOrder()->value('id') ?? $departmentId,
                'head_id' => $head->id,
            ]);
            $staff->assignRole($roles['staff']);
        }
        // Ticket::factory()->count(5000)->create();
    }
}
