<?php

namespace Database\Factories;

use App\Models\Feedback;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feedback>
 */
class FeedbackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Feedback::class;

    public function definition(): array
    {
        $types = ['bug', 'suggestion', 'question', 'praise'];
        $statuses = ['new', 'in_review', 'resolved', 'closed'];
        $severities = ['low', 'medium', 'high', 'critical'];
        $sources = ['dashboard', 'report', 'settings', 'profile'];

        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'comment' => $this->faker->paragraph(),
            'type' => $this->faker->randomElement($types),
            'source' => $this->faker->randomElement($sources),
            'severity' => $this->faker->randomElement($severities),
            'version' => 'v' . $this->faker->numerify('##.##.##'),
            'status' => $this->faker->randomElement($statuses),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
