<?php
namespace Database\Factories;

use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;

class DepartmentFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement([
                'MANAGEMENT',
                'ACCOUNTING DEPARTMENT',
                'ADMIN DEPARTMENT',
                'ELECTRONIC DATA DEPARTMENT',
                'MARKET AND RESEARCH DEVELOPMENT',
                'HUMAN RESOURCE AND PAYROLL DEPARTMENT',
                'KENVA PROPERTIES CORPORATION',
                'LEASING DEPARTMENT',
                'MCARES DEPARTMENT',
                'PURCHASING DEPARTMENT',
                'SALES AND OPERATION DEPARTMENT',
            ]),
            'parent_id' => null,
        ];
    }

    public function withParent(): Factory
    {
        return $this->state(function () {
            return [
                'parent_id' => Department::inRandomOrder()->first()?->id,
            ];
        });
    }
}
