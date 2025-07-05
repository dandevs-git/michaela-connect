<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('priorities')->delete();

        DB::table('priorities')->insert([
            [
                'name' => 'Low',
                'response_time' => 480,
                'resolution_time' => 8640,
            ],
            [
                'name' => 'Medium',
                'response_time' => 240,
                'resolution_time' => 4320,
            ],
            [
                'name' => 'High',
                'response_time' => 60,
                'resolution_time' => 720,
            ],
            [
                'name' => 'Urgent',
                'response_time' => 15,
                'resolution_time' => 240,
            ],
        ]);
    }
}
