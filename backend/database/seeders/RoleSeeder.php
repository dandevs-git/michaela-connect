<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
    }
}
