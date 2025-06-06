<?php


namespace Database\Seeders;

use App\Models\Anydesk;
use App\Models\Department;
use App\Models\Feedback;
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

        Department::factory()->count(8)->create();

        $roles = [
            'superadmin' => Role::firstOrCreate(['name' => 'superadmin']),
            'admin' => Role::firstOrCreate(['name' => 'admin']),
            'manager' => Role::firstOrCreate(['name' => 'manager']),
            'head' => Role::firstOrCreate(['name' => 'head']),
            'staff' => Role::firstOrCreate(['name' => 'staff']),
        ];

        $roles['manager']->parent_id = $roles['admin']->id;
        $roles['manager']->save();

        $roles['head']->parent_id = $roles['manager']->id;
        $roles['head']->save();

        $roles['staff']->parent_id = $roles['head']->id;
        $roles['staff']->save();

        $superadmin = User::create([
            'rfid' => '1111111111',
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'password' => Hash::make('110686'),
            'status' => 'active',
        ]);

        $superadmin->assignRole($roles['superadmin']);

        for ($i = 1; $i <= 5; $i++) {
            $admin = User::create([
                'rfid' => str_pad(random_int(0, 9999999999), 10, '0', STR_PAD_LEFT),
                'name' => "Admin $i",
                'username' => "admin$i",
                'password' => Hash::make('110686'),
                'status' => 'active',
                'department_id' => $i,
                // 'department_id' => Department::inRandomOrder()->first()->id ?? 1,
            ]);
            $admin->assignRole($roles['admin']);

            $manager = User::create([
                'rfid' => str_pad(random_int(0, 9999999999), 10, '0', STR_PAD_LEFT),
                'name' => "Manager $i",
                'username' => "manager$i",
                'password' => Hash::make('110686'),
                'status' => 'active',
                'department_id' => $i,
                // 'department_id' => Department::inRandomOrder()->first()->id ?? 1,
            ]);
            $manager->assignRole($roles['manager']);

            $head = User::create([
                'rfid' => str_pad(random_int(0, 9999999999), 10, '0', STR_PAD_LEFT),
                'name' => "Head $i",
                'username' => "head$i",
                'password' => Hash::make('110686'),
                'status' => 'active',
                'department_id' => $i,
                // 'department_id' => Department::inRandomOrder()->first()->id ?? 1,
            ]);
            $head->assignRole($roles['head']);

            $staff = User::create([
                'rfid' => str_pad(random_int(0, 9999999999), 10, '0', STR_PAD_LEFT),
                'name' => "Staff $i",
                'username' => "staff$i",
                'password' => Hash::make('110686'),
                'status' => 'active',
                'department_id' => $i,
                // 'department_id' => Department::inRandomOrder()->first()->id ?? 1,
            ]);
            $staff->assignRole($roles['staff']);
        }



        Telephone::factory()->count(10)->create();
        Internet::factory()->count(10)->create();
        IpAddress::factory()->count(10)->create();
        Anydesk::factory()->count(10)->create();
        Printer::factory()->count(10)->create();
        Feedback::factory()->count(10)->create();



        // ini_set('memory_limit', '1G');

        // $batchSize = 10000;
        // $total = 1000000;

        // for ($i = 0; $i < ($total / $batchSize); $i++) {
        //     Ticket::factory()->count($batchSize)->create();
        //     echo "Batch $i inserted\n";
        // }

        Ticket::factory()->count(1000)->create();
    }
}
