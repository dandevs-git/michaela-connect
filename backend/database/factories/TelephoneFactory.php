<?php

namespace Database\Factories;

use App\Models\Cable;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Telephone>
 */
class TelephoneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number' => $this->faker->unique()->phoneNumber(),
            'cable_code' => $this->faker->unique()->bothify('CABLE-####'),
            'location' => $this->faker->optional()->address(),
            'description' => $this->faker->optional()->sentence(),
        ];
    }
}
