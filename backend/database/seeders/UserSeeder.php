<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            // MANAGER
            ['name' => 'Julie Yeo', 'role' => 'admin', 'department_id' => 1, 'position' => 'Admin Manager'],
            ['name' => 'Kenneth Go', 'role' => 'admin', 'department_id' => 1, 'position' => 'General Manager'],

            // ACCOUNTING DEPARTMENT
            ['name' => 'Mark Ramos', 'role' => 'manager', 'department_id' => 2, 'position' => 'Finance Manager'],
            ['name' => 'Jocelyn Lausingco', 'role' => 'manager', 'department_id' => 2, 'position' => 'Accounting Manager'],
            ['name' => 'Nenita Alvaro', 'role' => 'manager', 'department_id' => 2, 'position' => 'Accounting Manager'],
            ['name' => 'Juliet Maniego', 'role' => 'staff', 'department_id' => 2, 'position' => 'Cash Custodian'],
            ['name' => 'Florence Taguiam', 'role' => 'staff', 'department_id' => 2, 'position' => 'Accounting Staff'],
            ['name' => 'Jennylyn Arambulo', 'role' => 'staff', 'department_id' => 2, 'position' => 'Accounting Staff'],
            ['name' => 'Mylene Alipio', 'role' => 'staff', 'department_id' => 2, 'position' => 'Accounting Staff'],
            ['name' => 'Rosalina Garcia', 'role' => 'staff', 'department_id' => 2, 'position' => 'Accounting Staff'],
            ['name' => 'Nida Mondala', 'role' => 'staff', 'department_id' => 2, 'position' => 'Accounting Staff'],
            ['name' => 'Orly Po', 'role' => 'staff', 'department_id' => 2, 'position' => 'Accounting Staff - New'],
            ['name' => 'Jayson Mangune', 'role' => 'staff', 'department_id' => 2, 'position' => 'Messenger'],

            // ADMIN DEPARTMENT
            ['name' => 'Grace Anne Hamaguchi', 'role' => 'staff', 'department_id' => 3, 'position' => 'Receptionist'],
            ['name' => 'Aira B. Marcelo', 'role' => 'staff', 'department_id' => 3, 'position' => 'Receptionist'],
            ['name' => 'Ryan Delamide', 'role' => 'staff', 'department_id' => 3, 'position' => 'Housekeeping'],
            ['name' => 'John Nemesis Reyes', 'role' => 'staff', 'department_id' => 3, 'position' => 'Housekeeping'],
            ['name' => 'Jennifer M. Mendoza', 'role' => 'staff', 'department_id' => 3, 'position' => 'Housekeeping'],
            ['name' => 'Reymart Criman', 'role' => 'staff', 'department_id' => 3, 'position' => 'Housekeeping'],
            ['name' => 'Michelle Dorado', 'role' => 'staff', 'department_id' => 3, 'position' => 'Housekeeping'],
            ['name' => 'Eleazar Ybañez Jr.', 'role' => 'staff', 'department_id' => 3, 'position' => 'Housekeeping'],
            ['name' => 'Sheena De Luna', 'role' => 'staff', 'department_id' => 3, 'position' => 'Housekeeping / Trainee'],
            ['name' => 'Carina Marantal', 'role' => 'staff', 'department_id' => 3, 'position' => 'Housekeeping / Trainee'],
            ['name' => 'Ariel P. Casuco', 'role' => 'staff', 'department_id' => 3, 'position' => 'Building & Maintenance In Charge'],
            ['name' => 'Oliver Reanzares', 'role' => 'staff', 'department_id' => 3, 'position' => 'Repair & Maintenance'],
            ['name' => 'Joemarie Carro', 'role' => 'staff', 'department_id' => 3, 'position' => 'Repair & Maintenance'],


            // ELECTRONIC DATA            
            ['name' => 'Javed Bolista', 'role' => 'manager', 'department_id' => 4, 'position' => 'Electronic Data Manager'],
            ['name' => 'Christian Evangelista', 'role' => 'head', 'department_id' => 4, 'position' => 'Data Officer / Electronic Data Asst. Manager'],


            // INVENTORY DEPARTMENT
            ['name' => 'Jeric Monterey', 'role' => 'head', 'department_id' => 13, 'position' => 'Inventory Officer'],
            ['name' => 'Dave Russel Trinidad', 'role' => 'staff', 'department_id' => 13, 'position' => 'Inventory Staff'],
            ['name' => 'Rommel Gilbuena', 'role' => 'staff', 'department_id' => 13, 'position' => 'Inventory Staff'],
            ['name' => 'Merimel Casupanan', 'role' => 'staff', 'department_id' => 13, 'position' => 'Inventory Staff'],
            ['name' => 'Geramie F. Moya', 'role' => 'staff', 'department_id' => 13, 'position' => 'Inventory Staff'],


            // DATA ENTRY DEPARTMENT
            ['name' => 'Lyka Jane Advincula', 'role' => 'staff', 'department_id' => 14, 'position' => 'Data Entry Officer'],
            ['name' => 'Jasmhen Joy Luna', 'role' => 'staff', 'department_id' => 14, 'position' => 'Data Entry Officer'],
            ['name' => 'Hilyn Nicolette Santiaguel', 'role' => 'staff', 'department_id' => 14, 'position' => 'Data Entry Officer'],
            ['name' => 'Jaydee R. Memije', 'role' => 'staff', 'department_id' => 14, 'position' => 'Data Entry Officer'],
            ['name' => 'Jayvee Delos Reyes', 'role' => 'staff', 'department_id' => 14, 'position' => 'Data Entry Officer'],
            ['name' => 'Therise Eloirie Valerio', 'role' => 'staff', 'department_id' => 14, 'position' => 'Data Entry Officer'],
            ['name' => 'Dominic M. Lezarda', 'role' => 'staff', 'department_id' => 14, 'position' => 'Data Entry Officer'],
            ['name' => 'Jellicoe G. Casadwan', 'role' => 'staff', 'department_id' => 14, 'position' => 'Data Entry Officer'],
            ['name' => 'Gerald Cueto', 'role' => 'staff', 'department_id' => 14, 'position' => 'Training'],
            ['name' => 'Rhaianne Rentoria', 'role' => 'staff', 'department_id' => 14, 'position' => 'Training'],


            // IT
            ['name' => 'Herminio Trinidad', 'role' => 'head', 'department_id' => 12, 'position' => 'IT Officer'],
            ['name' => 'John Justin Feranil', 'role' => 'staff', 'department_id' => 12, 'position' => 'IT Staff'],
            ['name' => 'Gilbert Steven Jose', 'role' => 'staff', 'department_id' => 12, 'position' => 'IT Staff'],
            ['name' => 'Danilo Abancia', 'role' => 'staff', 'department_id' => 12, 'position' => 'IT Staff'],
            ['name' => 'Patrick Joshua C. Bautista', 'role' => 'staff', 'department_id' => 12, 'position' => 'IT Staff'],



            // MARKET & RESEARCH
            ['name' => 'Oliver Valera', 'role' => 'manager', 'department_id' => 5, 'position' => 'Market and Research Devt. Manager'],



            // GRAPHICS
            ['name' => 'Orlando Gonzales', 'role' => 'head', 'department_id' => 26, 'position' => 'Market and Research Devt. Asst. Manager'],
            ['name' => 'Darwin Ursua', 'role' => 'staff', 'department_id' => 26, 'position' => 'Graphics Staff'],
            ['name' => 'Rafael P. Labitag', 'role' => 'staff', 'department_id' => 26, 'position' => 'Graphics Staff'],
            ['name' => 'Denise Angelica Garcia', 'role' => 'staff', 'department_id' => 26, 'position' => 'Graphics Staff'],
            ['name' => 'Rhaphuncel Joy De Leon', 'role' => 'staff', 'department_id' => 26, 'position' => 'Graphics Staff'],


            // LIVE SELLER
            ['name' => 'Trisha Moldes', 'role' => 'head', 'department_id' => 25, 'position' => 'Live Seller'],
            ['name' => 'Loysa Joy Azur', 'role' => 'staff', 'department_id' => 25, 'position' => 'Live Seller'],
            ['name' => 'Jaymie Ann O. Blanes', 'role' => 'staff', 'department_id' => 25, 'position' => 'Live Seller'],
            ['name' => 'Josephine Robosa', 'role' => 'staff', 'department_id' => 25, 'position' => 'Live Seller'],
            ['name' => 'Ervin John Pastores', 'role' => 'staff', 'department_id' => 25, 'position' => 'Live Seller Trainee'],


            // HR & PAYROLL
            ['name' => 'Liberato Garcia', 'role' => 'manager', 'department_id' => 6, 'position' => 'HR/Payroll Head'],


            // HR
            ['name' => 'Zyrine Tasic', 'role' => 'head', 'department_id' => 15, 'position' => 'HR Supervisor - Boutique'],
            ['name' => 'Connie Ann Sale', 'role' => 'staff', 'department_id' => 15, 'position' => 'HR Staff - Office & Warehouse'],
            ['name' => 'Renalyn Simbajon', 'role' => 'staff', 'department_id' => 15, 'position' => 'HR Clerk - SM'],
            ['name' => 'Shiara Cruz', 'role' => 'staff', 'department_id' => 15, 'position' => 'HR Staff - ODS'],
            ['name' => 'Aubrey Rose Llave', 'role' => 'staff', 'department_id' => 15, 'position' => 'HR Staff - Warehouse'],
            ['name' => 'Raven Christopher Pecaña', 'role' => 'staff', 'department_id' => 15, 'position' => 'HR Staff - Recruitment'],
            ['name' => 'Cherrie Mae Agahan', 'role' => 'staff', 'department_id' => 15, 'position' => 'HR Staff - Benefits'],
            ['name' => 'Stephanie Joy Cajigas', 'role' => 'staff', 'department_id' => 15, 'position' => 'HR Staff - Metro'],


            // PAYROLL
            ['name' => 'Shayne Solinap', 'role' => 'head', 'department_id' => 16, 'position' => 'Payroll Staff'],
            ['name' => 'Erica Ceela Acebo', 'role' => 'staff', 'department_id' => 16, 'position' => 'Payroll Staff'],
            ['name' => 'Romalin Baylen', 'role' => 'staff', 'department_id' => 16, 'position' => 'Payroll Staff'],
            ['name' => 'Vaynne Aira T. Morata', 'role' => 'staff', 'department_id' => 16, 'position' => 'Payroll Staff'],


            // OTHER
            ['name' => 'Liljanah Wong', 'role' => 'staff', 'department_id' => 1, 'position' => ''],
            ['name' => 'Christine Angelie Yeo Taw', 'role' => 'staff', 'department_id' => 1, 'position' => ''],
            ['name' => 'Jason Ting', 'role' => 'staff', 'department_id' => 1, 'position' => ''],


            // LEASING
            ['name' => 'Dennis Choi', 'role' => 'head', 'department_id' => 8, 'position' => 'Leasing Head'],
            ['name' => 'Paul John H. Bakil', 'role' => 'staff', 'department_id' => 8, 'position' => 'Leasing Staff'],


            // MCARES
            ['name' => 'Ana Sison', 'role' => 'head', 'department_id' => 9, 'position' => 'HR Manager & MCARES Head'],
            ['name' => 'Hernath Cruz', 'role' => 'staff', 'department_id' => 9, 'position' => 'MCARES Staff'],


            // PURCHASING
            ['name' => 'Marichelle Chan', 'role' => 'manager', 'department_id' => 10, 'position' => 'Purchasing Manager'],
            ['name' => 'Agnes Sazon Olaguir', 'role' => 'head', 'department_id' => 10, 'position' => 'Purchasing Asst. Manager'],
            ['name' => 'Rowena Custodio', 'role' => 'staff', 'department_id' => 10, 'position' => 'Purchasing Staff'],
            ['name' => 'Ryan Gubio', 'role' => 'staff', 'department_id' => 10, 'position' => 'Purchasing Staff - VM'],


            // SALES
            [
                'name' => 'Timothy Sy',
                'role' => 'manager',
                'department_id' => 11,
                'position' => 'Operations Manager',
            ],
            [
                'name' => 'Rosalie Brier',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Operations Coordinator',
            ],
            [
                'name' => 'Marvin Becina',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Logistics Assistant',
            ],
            [
                'name' => 'Gither F. Trinidad',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Production Staff',
            ],
            [
                'name' => 'Alexa Loreign Magadia',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Office Clerk',
            ],
            [
                'name' => 'Jerry Jr. Miranda',
                'role' => 'manager',
                'department_id' => 11,
                'position' => 'Assistant Operations Manager',
            ],
            [
                'name' => 'Winnie Barcolta',
                'role' => 'head',
                'department_id' => 11,
                'position' => 'Department Head',
            ],
            [
                'name' => 'Niño Zeta',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Field Staff',
            ],
            [
                'name' => 'Meriel Haluan',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Field Staff',
            ],
            [
                'name' => 'Akina Mateo',
                'role' => 'manager',
                'department_id' => 11,
                'position' => 'Senior Operations Manager',
            ],
            [
                'name' => 'April Rose Soriano',
                'role' => 'head',
                'department_id' => 11,
                'position' => 'Team Lead',
            ],
            [
                'name' => 'Mariam Molito',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Support Staff',
            ],
            [
                'name' => 'Jomarie Pangindian',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Support Staff',
            ],
            [
                'name' => 'Romelyn Ubatay',
                'role' => 'manager',
                'department_id' => 11,
                'position' => 'Project Manager',
            ],
            [
                'name' => 'Virginia Bolaños',
                'role' => 'head',
                'department_id' => 11,
                'position' => 'Section Head',
            ],
            [
                'name' => 'Judy Ann Jara',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Inventory Clerk',
            ],
            [
                'name' => 'George Lucban',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Technical Staff',
            ],
            [
                'name' => 'Chrismar Cuevas',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Warehouse Assistant',
            ],
            [
                'name' => 'Jing Barso',
                'role' => 'manager',
                'department_id' => 11,
                'position' => 'Supply Chain Manager',
            ],
            [
                'name' => 'Rogelio Dagoc Jr.',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Logistics Staff',
            ],
            [
                'name' => 'Cherry Ancheta',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Logistics Staff',
            ],
            [
                'name' => 'Eugene Manucot',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Operations Assistant',
            ],
            [
                'name' => 'Renielyn Dela Cruz',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Support Assistant',
            ],
            [
                'name' => 'Claire V. Pajares',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Admin Staff',
            ],
            [
                'name' => 'Jeramae I. Berja',
                'role' => 'staff',
                'department_id' => 11,
                'position' => 'Admin Assistant',
            ],

        ];

        $superadmin = User::create([
            'rfid' => '1111111111',
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'position' => 'Developer',
            'password' => Hash::make('110686'),
            'status' => 'active',
        ]);

        $superadmin->assignRole('superadmin');


        foreach ($users as $item) {
            $parts = explode(' ', $item['name']);
            $firstInitial = strtolower($parts[0][0]);
            $lastName = strtolower(end($parts));
            $username = strtolower($firstInitial . $lastName);
            $password = '1234';

            $user = User::create([
                'rfid' => str_pad(random_int(0, 9999999999), 10, '0', STR_PAD_LEFT),
                'name' => $item['name'],
                'username' => $username,
                'password' => Hash::make($password),
                'department_id' => $item['department_id'],
                'position' => $item['position'],
                'status' => 'active',
            ]);

            $user->assignRole($item['role']);
        }
    }
}
