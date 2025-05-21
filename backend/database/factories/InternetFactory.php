<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Internet>
 */
class InternetFactory extends Factory
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
            'name' => $this->faker->unique()->company() . ' Network',
            'provider' => $this->faker->company(),
            'gateway' => $this->faker->ipv4(),
            'cable_code' => strtoupper($this->faker->unique()->bothify('CABLE-####')),
            'location' => $this->faker->optional()->address(),
            'description' => $this->faker->optional()->sentence(),
        ];
    }
}
