<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\IpAddress>
 */
class IpAddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'ip_address' => $this->faker->unique()->ipv4(),
            'device_type' => $this->faker->randomElement(['PC', 'Printer', 'Server', 'Other']),
            'device_name' => $this->faker->word(),
            'assigned_date' => $this->faker->optional()->date(),
            'location' => $this->faker->optional()->address(),
            'description' => $this->faker->optional()->sentence(),
        ];
    }
}
