<?php

namespace Database\Factories;

use App\Models\DirectoryCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DirectoryEntry>
 */
class DirectoryEntryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => DirectoryCategory::factory(),
            'name' => $this->faker->unique()->word,
            'attributes' => json_encode([
                'ip_address' => $this->faker->ipv4,
                'location' => $this->faker->city
            ])
        ];
    }
}
