<?php

namespace Database\Factories;

use App\Models\Department;
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
        // Created at between 1 year ago and now
        $createdAt = $this->faker->dateTimeBetween('-1 year', 'now');

        $status = $this->faker->randomElement([
            'pending',
            'new',
            'open',
            'rejected',
            'in_progress',
            'resolved',
            'failed',
            'closed',
            'reopened'
        ]);

        $startAt = in_array($status, ['in_progress', 'resolved', 'failed', 'closed'])
            ? (clone $createdAt)->modify('+' . rand(1, 5) . ' days')
            : null;

        $approvedAt = in_array($status, ['new', 'open', 'in_progress', 'resolved', 'failed', 'closed'])
            ? (clone $createdAt)->modify('+' . rand(0, 2) . ' days')
            : null;

        $resolvedAt = in_array($status, ['resolved', 'failed', 'closed'])
            ? (clone $startAt ?? $createdAt)->modify('+' . rand(1, 10) . ' days')
            : null;

        $failedAt = $status === 'failed' ? $resolvedAt : null;

        $completedAt = in_array($status, ['resolved', 'failed', 'closed'])
            ? (clone $resolvedAt)->modify('+' . rand(0, 3) . ' days')
            : null;

        return [
            'ticket_number' => strtoupper('TKT-' . $this->faker->unique()->bothify('##??##')),
            'title' => $this->faker->sentence(6),
            'description' => $this->faker->paragraph(),
            'priority_id' => Priority::inRandomOrder()->first()->id ?? 1,
            'status' => $status,
            'origin_department_id' => Department::inRandomOrder()->first()->id ?? 1,
            'requester_id' => User::inRandomOrder()->first()->id ?? 1,
            'target_department_id' => Department::inRandomOrder()->first()->id ?? 1,
            'assigned_to' => User::inRandomOrder()->first()->id ?? 1,
            'start_at' => $startAt,
            'approved_at' => $approvedAt,
            'resolved_at' => $resolvedAt,
            'failed_at' => $failedAt,
            'completed_at' => $completedAt,
            'response_deadline' => (clone $createdAt)->modify('+1 day'),
            'resolution_deadline' => (clone $createdAt)->modify('+3 days'),
            'sla_breached' => (bool) rand(0, 1),
            'created_at' => $createdAt,
            'updated_at' => now(),
        ];
    }
}
