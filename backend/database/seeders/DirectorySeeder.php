<?php

namespace Database\Seeders;

use App\Models\DirectoryCategory;
use App\Models\DirectoryEntry;
use Illuminate\Database\Seeder;

class DirectorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Printers', 'PCs', 'IP Addresses', 'AnyDesks', 'Telephones', 'Cables'];

        foreach ($categories as $category) {
            DirectoryCategory::firstOrCreate(['name' => $category]);
        }
    }
}
