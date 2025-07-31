<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Wifi>
 */
class WifiFactory extends Factory
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
            'device' => $this->faker->word(),
            'ip_address' => $this->faker->unique()->ipv4(),
            'ssid' => $this->faker->word() . '_SSID',
            'gateway' => $this->faker->ipv4(),
            'mac_address' => $this->faker->unique()->macAddress(),
        ];
    }
}
