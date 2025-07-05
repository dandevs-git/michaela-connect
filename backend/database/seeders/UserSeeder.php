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
            // ADMIN
            ['name' => 'Julie Yeo', 'role' => 'admin', 'department_id' => 1],
            ['name' => 'Kenneth Go', 'role' => 'admin', 'department_id' => 1],

            // ACCOUNTING DEPARTMENT
            ['name' => 'Mark Ramos', 'role' => 'manager', 'department_id' => 2],
            ['name' => 'Jocelyn Lausingco', 'role' => 'manager', 'department_id' => 2],
            ['name' => 'Nenita Alvaro', 'role' => 'manager', 'department_id' => 2],
            ['name' => 'Juliet Maniego', 'role' => 'staff', 'department_id' => 2],
            ['name' => 'Florence Taguiam', 'role' => 'staff', 'department_id' => 2],
            ['name' => 'Jennylyn Arambulo', 'role' => 'staff', 'department_id' => 2],
            ['name' => 'Mylene Alipio', 'role' => 'staff', 'department_id' => 2],
            ['name' => 'Rosalina Garcia', 'role' => 'staff', 'department_id' => 2],
            ['name' => 'Nida Mondala', 'role' => 'staff', 'department_id' => 2],
            ['name' => 'Orly Po', 'role' => 'staff', 'department_id' => 2],
            ['name' => 'Jayson Mangune', 'role' => 'staff', 'department_id' => 2],

            // ADMIN DEPARTMENT
            ['name' => 'Grace Anne Hamaguchi', 'role' => 'staff', 'department_id' => 3],
            ['name' => 'Aira B. Marcelo', 'role' => 'staff', 'department_id' => 3],
            ['name' => 'Ryan Delamide', 'role' => 'staff', 'department_id' => 3],
            ['name' => 'John Nemesis Reyes', 'role' => 'staff', 'department_id' => 3],
            ['name' => 'Jennifer M. Mendoza', 'role' => 'staff', 'department_id' => 3],
            ['name' => 'Reymart Criman', 'role' => 'staff', 'department_id' => 3],
            ['name' => 'Michelle Dorado', 'role' => 'staff', 'department_id' => 3],
            ['name' => 'Eleazar Ybañez Jr.', 'role' => 'staff', 'department_id' => 3],
            ['name' => 'Sheena De Luna', 'role' => 'staff', 'department_id' => 3],
            ['name' => 'Carina Marantal', 'role' => 'staff', 'department_id' => 3],
            ['name' => 'Ariel P. Casuco', 'role' => 'staff', 'department_id' => 3],
            ['name' => 'Oliver Reanzares', 'role' => 'staff', 'department_id' => 3],
            ['name' => 'Joemarie Carro', 'role' => 'staff', 'department_id' => 3],

            // ELECTRONIC DATA
            ['name' => 'Javed Bolista', 'role' => 'manager', 'department_id' => 4],

            // INVENTORY DEPARTMENT
            ['name' => 'Jeric Monterey', 'role' => 'head', 'department_id' => 13],
            ['name' => 'Dave Russel Trinidad', 'role' => 'staff', 'department_id' => 13],
            ['name' => 'Rommel Gilbuena', 'role' => 'staff', 'department_id' => 13],
            ['name' => 'Merimel Casupanan', 'role' => 'staff', 'department_id' => 13],
            ['name' => 'Geramie F. Moya', 'role' => 'staff', 'department_id' => 13],

            // DATA ENTRY DEPARTMENT
            ['name' => 'Christian Evangelista', 'role' => 'head', 'department_id' => 14],
            ['name' => 'Lyka Jane Advincula', 'role' => 'staff', 'department_id' => 14],
            ['name' => 'Jasmhen Joy Luna', 'role' => 'staff', 'department_id' => 14],
            ['name' => 'Hilyn Nicolette Santiaguel', 'role' => 'staff', 'department_id' => 14],
            ['name' => 'Jaydee R. Memije', 'role' => 'staff', 'department_id' => 14],
            ['name' => 'Jayvee Delos Reyes', 'role' => 'staff', 'department_id' => 14],
            ['name' => 'Therise Eloirie Valerio', 'role' => 'staff', 'department_id' => 14],
            ['name' => 'Dominic M. Lezarda', 'role' => 'staff', 'department_id' => 14],
            ['name' => 'Jellicoe G. Casadwan', 'role' => 'staff', 'department_id' => 14],

            // IT
            ['name' => 'Herminio Trinidad', 'role' => 'head', 'department_id' => 11],
            ['name' => 'John Justin Feranil', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Gilbert Steven Jose', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Danilo Abancia Jr.', 'role' => 'staff', 'department_id' => 11],

            // MARKET & RESEARCH
            ['name' => 'Oliver Valera', 'role' => 'manager', 'department_id' => 5],

            // GRAPHICS
            ['name' => 'Orlando Gonzales', 'role' => 'head', 'department_id' => 26],
            ['name' => 'Darwin Ursua', 'role' => 'staff', 'department_id' => 26],
            ['name' => 'Rafael P. Labitag', 'role' => 'staff', 'department_id' => 26],
            ['name' => 'Denise Angelica Garcia', 'role' => 'staff', 'department_id' => 26],
            ['name' => 'Rhaphuncel Joy De Leon', 'role' => 'staff', 'department_id' => 26],

            // LIVE SELLER
            ['name' => 'Trisha Moldes', 'role' => 'head', 'department_id' => 25],
            ['name' => 'Loysa Joy Azur', 'role' => 'staff', 'department_id' => 25],
            ['name' => 'Jaymie Ann O. Blanes', 'role' => 'staff', 'department_id' => 25],
            ['name' => 'Josephine Robosa', 'role' => 'staff', 'department_id' => 25],
            ['name' => 'Ervin John Pastores', 'role' => 'staff', 'department_id' => 25],

            // HR & PAYROLL
            ['name' => 'Liberato Garcia', 'role' => 'manager', 'department_id' => 6],

            // HR
            ['name' => 'Zyrine Tasic', 'role' => 'head', 'department_id' => 15],
            ['name' => 'Connie Ann Sale', 'role' => 'staff', 'department_id' => 15],
            ['name' => 'Renalyn Simbajon', 'role' => 'staff', 'department_id' => 15],
            ['name' => 'Shiara Cruz', 'role' => 'staff', 'department_id' => 15],
            ['name' => 'Aubrey Rose Llave', 'role' => 'staff', 'department_id' => 15],
            ['name' => 'Raven Christopher Pecaña', 'role' => 'staff', 'department_id' => 15],
            ['name' => 'Cherrie Mae Agahan', 'role' => 'staff', 'department_id' => 15],
            ['name' => 'Stephanie Joy Cajigas', 'role' => 'staff', 'department_id' => 15],

            // PAYROLL
            ['name' => 'Shayne Solinap', 'role' => 'head', 'department_id' => 16],
            ['name' => 'Erica Ceela Acebo', 'role' => 'staff', 'department_id' => 16],
            ['name' => 'Romalin Baylen', 'role' => 'staff', 'department_id' => 16],
            ['name' => 'Vaynne Aira T. Morata', 'role' => 'staff', 'department_id' => 16],

            // OTHER
            ['name' => 'Liljanah Wong', 'role' => 'staff', 'department_id' => 1],
            ['name' => 'Christine Angelie Yeo Taw', 'role' => 'staff', 'department_id' => 1],
            ['name' => 'Jason Ting', 'role' => 'staff', 'department_id' => 1],

            // LEASING
            ['name' => 'Dennis Choi', 'role' => 'head', 'department_id' => 8],
            ['name' => 'Paul John H. Bakil', 'role' => 'staff', 'department_id' => 8],

            // MCARES
            ['name' => 'Ana Sison', 'role' => 'head', 'department_id' => 9],
            ['name' => 'Hernath Cruz', 'role' => 'staff', 'department_id' => 9],

            // PURCHASING
            ['name' => 'Marichelle Chan', 'role' => 'manager', 'department_id' => 10],
            ['name' => 'Agnes Sazon Olaguir', 'role' => 'head', 'department_id' => 10],
            ['name' => 'Rowena Custodio', 'role' => 'staff', 'department_id' => 10],
            ['name' => 'Ryan Gubio', 'role' => 'staff', 'department_id' => 10],

            // SALES
            ['name' => 'Timothy Sy', 'role' => 'manager', 'department_id' => 11],
            ['name' => 'Rosalie Brier', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Marvin Becina', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Gither F. Trinidad', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Alexa Loreign Magadia', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Jerry Jr. Miranda', 'role' => 'manager', 'department_id' => 11],
            ['name' => 'Winnie Barcolta', 'role' => 'head', 'department_id' => 11],
            ['name' => 'Niño Zeta', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Meriel Haluan', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Akina Mateo', 'role' => 'manager', 'department_id' => 11],
            ['name' => 'April Rose Soriano', 'role' => 'head', 'department_id' => 11],
            ['name' => 'Mariam Molito', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Jomarie Pangindian', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Romelyn Ubatay', 'role' => 'manager', 'department_id' => 11],
            ['name' => 'Virginia Bolaños', 'role' => 'head', 'department_id' => 11],
            ['name' => 'Judy Ann Jara', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'George Lucban', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Chrismar Cuevas', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Jing Barso', 'role' => 'manager', 'department_id' => 11],
            ['name' => 'Rogelio Dagoc Jr.', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Cherry Ancheta', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Eugene Manucot', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Renielyn Dela Cruz', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Claire V. Pajares', 'role' => 'staff', 'department_id' => 11],
            ['name' => 'Jeramae I. Berja', 'role' => 'staff', 'department_id' => 11],
        ];

        $superadmin = User::create([
            'rfid' => '1111111111',
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'password' => Hash::make('110686'),
            'status' => 'active',
        ]);

        $superadmin->assignRole('superadmin');



        foreach ($users as $item) {
            $firstName = explode(' ', $item['name'])[0];
            $username = strtolower($firstName);
            $password = '1234';

            $user = User::create([
                'rfid' => str_pad(random_int(0, 9999999999), 10, '0', STR_PAD_LEFT),
                'name' => $item['name'],
                'username' => $username,
                'password' => Hash::make($password),
                'department_id' => $item['department_id'],
                'status' => 'active',
            ]);

            $user->assignRole($item['role']);
        }
    }
}
