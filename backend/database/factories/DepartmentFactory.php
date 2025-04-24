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
                'DATA ENTRY',
                'PAYROLL',
                'SALES',
                'INVENTORY',
                'PURCHASING',
                'PRODUCTION',
                'MARKETING',
                'RESEARCH AND DEVELOPMENT',
                'LOGISTICS',
                'CUSTOMER SERVICE',
                'QUALITY ASSURANCE',
                'TECHNICAL SUPPORT',
                'ADMINISTRATION',
                'FINANCE',
                'LEGAL',
                'COMPLIANCE',
                'BUSINESS DEVELOPMENT',
                'PROJECT MANAGEMENT',
                'STRATEGY',
                'TRAINING AND DEVELOPMENT',
                'PUBLIC RELATIONS',
                'GRAPHIC DESIGN',
                'WEB DEVELOPMENT',
                'SOCIAL MEDIA',
                'SEO',
                'CONTENT CREATION',
                'DATA ANALYSIS',
                'DATABASE ADMINISTRATION',
                'NETWORK ADMINISTRATION',
                'SYSTEMS ADMINISTRATION',
                'APPLICATION SUPPORT',
                'HUMAN RESOURCES',
                'CONCESSION',
                'ACCOUNTING',
                'WAREHOUSE',
                'ENCODER',
            ]),
            'parent_id' => null, // default to null
        ];
    }

    /**
     * Optionally assign a parent department
     */
    public function withParent(): Factory
    {
        return $this->state(function () {
            return [
                'parent_id' => Department::inRandomOrder()->first()?->id,
            ];
        });
    }
}
