<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            'MANAGEMENT',                               // 1
            'ACCOUNTING DEPARTMENT',                    // 2
            'ADMIN DEPARTMENT',                         // 3
            'ELECTRONIC DATA DEPARTMENT',               // 4
            'MARKET AND RESEARCH DEVELOPMENT',          // 5
            'HUMAN RESOURCE AND PAYROLL DEPARTMENT',    // 6
            'KENVA PROPERTIES CORPORATION',             // 7
            'LEASING DEPARTMENT',                       // 8
            'MCARES DEPARTMENT',                        // 9
            'PURCHASING DEPARTMENT',                    // 10    
            'SALES AND OPERATION DEPARTMENT',           // 11
        ];

        $subDepartments = [
            // ELECTRONIC DATA DEPARTMENT
            ['IT DEPARTMENT', 4],                       // 12
            ['INVENTORY DEPARTMENT', 4],                // 13
            ['DATA ENTRY DEPARTMENT', 4],               // 14

            // HUMAN RESOURCE AND PAYROLL DEPARTMENT
            ['HUMAN RESOURCE DEPARTMENT', 6],           // 15     
            ['PAYROLL DEPARTMENT', 6],                  // 16  

            // ACCOUNTING DEPARTMENT
            ['KENVA ACCOUNTING DEPARTMENT', 2],          // 17
            ['GOLDNINES ACCOUNTING DEPARTMENT', 2],      // 18
            ['VARAY ACCOUNTING DEPARTMENT', 2],          // 19

            // SALES AND OPERATION DEPARTMENT
            ['RDS SALES DEPARTMENT', 11],                 // 20
            ['ODS SALES DEPARTMENT', 11],                 // 21
            ['METRO SALES DEPARTMENT', 11],               // 22
            ['SM SALES DEPARTMENT', 11],                  // 23
            ['BOUTIQUE SALES DEPARTMENT', 11],            // 24

            // MARKET AND RESEARCH DEVELOPMENT
            ['ONLINE DEPARTMENT', 5],                     // 25
            ['LIVE SELLER DEPARTMENT', 5],                // 25
            ['GRAPHICS DEPARTMENT', 5],                   // 26
        ];

        foreach ($departments as $name) {
            Department::create(['name' => $name]);
        }

        foreach ($subDepartments as [$name, $parentId]) {
            Department::create([
                'name' => $name,
                'parent_id' => $parentId,
            ]);
        }
    }
}
