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
use App\Models\Wifi;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(PermissionSeeder::class);
        $this->call(DepartmentSeeder::class);
        $this->call(PrioritySeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);


        // Telephone::factory()->count(10)->create();
        // Internet::factory()->count(10)->create();
        // Wifi::factory()->count(10)->create();
        // IpAddress::factory()->count(10)->create();
        // Anydesk::factory()->count(10)->create();
        // Printer::factory()->count(10)->create();
        // Feedback::factory()->count(10)->create();
        // Ticket::factory()->count(100)->create();

        // ini_set('memory_limit', '1G');

        // $batchSize = 10000;
        // $total = 1000000;

        // for ($i = 0; $i < ($total / $batchSize); $i++) {
        //     Ticket::factory()->count($batchSize)->create();
        //     echo "Batch $i inserted\n";
        // }

    }
}
