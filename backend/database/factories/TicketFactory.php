<?php

namespace Database\Factories;

use App\Models\Priority;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdAt = $this->faker->dateTimeBetween('-30 days', 'now');
        $status = $this->faker->randomElement(['pending', 'in_progress', 'resolved', 'failed']);

        return [
            'ticket_number' => strtoupper('TKT-' . $this->faker->unique()->bothify('##??##')),
            'title' => $this->faker->sentence(6),
            'description' => $this->faker->paragraph(),
            'priority_id' => Priority::inRandomOrder()->first()->id ?? 1,
            'status' => $status,
            'requester_id' => User::inRandomOrder()->first()->id ?? 1,
            'assigned_to' => User::inRandomOrder()->first()->id ?? 1,
            'resolved_at' => $status === 'resolved' ? now()->subDays(rand(1, 10)) : null,
            'failed_at' => $status === 'failed' ? now()->subDays(rand(1, 10)) : null,
            'completed_at' => in_array($status, ['resolved', 'failed']) ? now()->subDays(rand(1, 5)) : null,
            'response_deadline' => $createdAt->modify('+1 day'),
            'resolution_deadline' => $createdAt->modify('+3 days'),
            'sla_breached' => (bool) rand(0, 1),
            'created_at' => $createdAt,
            'updated_at' => now(),
        ];
    }
}
