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

        $superadmin = User::create([
            'rfid' => '1111111111',
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'password' => Hash::make('110686'),
            'role' => 'superadmin',
            'status' => 'active',
            'department_id' => Department::find(1)->id,
        ]);

        $superadmin->assignRole($roles['superadmin']);

        for ($i = 1; $i <= 2; $i++) {
            $admin = User::create([
                'rfid' => str_pad(random_int(0, 9999999999), 10, '0', STR_PAD_LEFT),
                'name' => "Admin $i",
                'username' => "admin$i",
                'password' => Hash::make('110686'),
                'role' => 'admin',
                'status' => 'active',
                'department_id' => Department::find($i)->id,
                'parent_id' => $superadmin->id,
            ]);
            $admin->assignRole($roles['admin']);

            $manager = User::create([
                'rfid' => str_pad(random_int(0, 9999999999), 10, '0', STR_PAD_LEFT),
                'name' => "Manager $i",
                'username' => "manager$i",
                'password' => Hash::make('110686'),
                'role' => 'manager',
                'status' => 'active',
                'department_id' => Department::find($i)->id,
                'parent_id' => $admin->id,
            ]);
            $manager->assignRole($roles['manager']);

            $head = User::create([
                'rfid' => str_pad(random_int(0, 9999999999), 10, '0', STR_PAD_LEFT),
                'name' => "Head $i",
                'username' => "head$i",
                'password' => Hash::make('110686'),
                'role' => 'head',
                'status' => 'active',
                'department_id' => Department::find($i)->id,
                'parent_id' => $manager->id,
            ]);
            $head->assignRole($roles['head']);

            $staff = User::create([
                'rfid' => str_pad(random_int(0, 9999999999), 10, '0', STR_PAD_LEFT),
                'name' => "Staff $i",
                'username' => "staff$i",
                'password' => Hash::make('110686'),
                'role' => 'staff',
                'status' => 'active',
                'department_id' => Department::find($i)->id,
                'parent_id' => $head->id,
            ]);
            $staff->assignRole($roles['staff']);
        }

        // ini_set('memory_limit', '1G');

        // $batchSize = 10000;
        // $total = 1000000;

        // for ($i = 0; $i < ($total / $batchSize); $i++) {
        //     Ticket::factory()->count($batchSize)->create();
        //     echo "Batch $i inserted\n";
        // }

        // Ticket::factory()->count(10000)->create();
    }
}
