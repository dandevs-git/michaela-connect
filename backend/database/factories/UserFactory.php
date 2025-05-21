<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Telephone;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {

        return [
            'rfid' => $this->faker->unique()->regexify('[A-Z0-9]{10}'),
            'name' => $this->faker->name(),
            'username' => $this->faker->unique()->userName(),
            'email' => $this->faker->unique()->safeEmail(),
            'profile_picture' => null,
            'password' => Hash::make('password123'),
            'status' => $this->faker->randomElement(['active', 'inactive', 'suspended', 'locked']),
            'department_id' => Department::inRandomOrder()->value('id') ?? Department::factory(),
            'failed_attempts' => $this->faker->numberBetween(0, 5),
            'remember_token' => Str::random(10),
            'deleted_at' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
