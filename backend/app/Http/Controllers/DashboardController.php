<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Services\TicketQueryService;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function getDashboardData()
    {
        $now = Carbon::now();
        $currentPeriodStart = $now->copy()->subDays(30);
        $previousPeriodStart = $now->copy()->subDays(60);
        $previousPeriodEnd = $now->copy()->subDays(31);

        $currentMetrics = $this->calculateMetrics($currentPeriodStart, $now);
        $previousMetrics = $this->calculateMetrics($previousPeriodStart, $previousPeriodEnd);

        $statusData = $this->getTicketStatusData($currentPeriodStart, $now);
        $volumeTrends = $this->getTicketVolumeTrends();

        $departmentTimes = $this->getDepartmentResolutionTimes($currentPeriodStart, $now, $previousPeriodStart, $previousPeriodEnd);

        return response()->json([
            'current' => $currentMetrics,
            'previous' => $previousMetrics,
            'delta' => $this->calculateDeltas($currentMetrics, $previousMetrics),
            'statusData' => $statusData,
            'volumeTrends' => $volumeTrends,
            'departmentTimes' => $departmentTimes,
        ]);
    }

    private function calculateMetrics($startDate, $endDate)
    {
        return [
            'totalTickets' => TicketQueryService::queryForCurrentUser()->whereBetween('created_at', [$startDate, $endDate])->count(),
            'resolvedTickets' => TicketQueryService::queryForCurrentUser()->resolved()->whereBetween('resolved_at', [$startDate, $endDate])->count(),
            'slaCompliance' => $this->calculateSlaCompliance($startDate, $endDate),
            'avgResolutionTime' => $this->calculateAverageResolutionTime($startDate, $endDate),
            'avgResponseTime' => $this->calculateAverageResponseTime($startDate, $endDate),
            'pendingApprovals' => TicketQueryService::queryForCurrentUser()->pending()->whereBetween('created_at', [$startDate, $endDate])->count(),
        ];
    }

    private function calculateDeltas($current, $previous)
    {
        return [
            'totalTicketsDelta' => $this->calculateDelta($current['totalTickets'], $previous['totalTickets']),
            'resolvedTicketsDelta' => $this->calculateDelta($current['resolvedTickets'], $previous['resolvedTickets']),
            'slaComplianceDelta' => $this->calculateDelta($current['slaCompliance'], $previous['slaCompliance']),
            'avgResolutionTimeDelta' => $this->calculateDelta($current['avgResolutionTime'], $previous['avgResolutionTime']),
            'avgResponseTimeDelta' => $this->calculateDelta($current['avgResponseTime'], $previous['avgResponseTime']),
            'pendingApprovalsDelta' => $this->calculateDelta($current['pendingApprovals'], $previous['pendingApprovals']),
        ];
    }

    private function calculateDelta($currentValue, $previousValue)
    {
        if ($previousValue == 0) {
            return $currentValue == 0 ? 0 : $currentValue;
        }
        return round($currentValue - $previousValue, 2);
    }

    private function calculateSlaCompliance($startDate, $endDate)
    {
        $resolvedOnTime = TicketQueryService::queryForCurrentUser()->resolved()
            ->whereBetween('resolved_at', [$startDate, $endDate])
            ->where('sla_breached', false)
            ->count();

        $totalResolved = TicketQueryService::queryForCurrentUser()->resolved()
            ->whereBetween('resolved_at', [$startDate, $endDate])
            ->count();

        return $totalResolved > 0 ? round(($resolvedOnTime / $totalResolved) * 100, 2) : 0;
    }

    private function calculateAverageResolutionTime($startDate, $endDate)
    {
        $resolvedTickets = TicketQueryService::queryForCurrentUser()->resolved()
            ->whereBetween('resolved_at', [$startDate, $endDate])
            ->get();

        $totalResolutionTime = $resolvedTickets->sum(function ($ticket) {
            return $ticket->start_at && $ticket->resolved_at
                ? $ticket->start_at->diffInMinutes($ticket->resolved_at)
                : 0;
        });

        $ticketCount = $resolvedTickets->filter(fn($ticket) => $ticket->start_at && $ticket->resolved_at)->count();

        return $ticketCount > 0 ? round($totalResolutionTime / $ticketCount, 2) : 0;
    }

    private function calculateAverageResponseTime($startDate, $endDate)
    {
        $tickets = TicketQueryService::queryForCurrentUser()->whereBetween('approved_at', [$startDate, $endDate])->get();

        $totalResponseTime = $tickets->sum(function ($ticket) {
            return $ticket->created_at && $ticket->approved_at
                ? $ticket->created_at->diffInMinutes($ticket->approved_at)
                : 0;
        });

        $ticketCount = $tickets->filter(fn($ticket) => $ticket->created_at && $ticket->approved_at)->count();

        return $ticketCount > 0 ? round($totalResponseTime / $ticketCount, 2) : 0;
    }

    private function getTicketStatusData($startDate, $endDate)
    {
        $statusDateMap = [
            'resolved' => 'resolved_at',
            'open' => 'approved_at',
            'in_progress' => 'start_at',
            'failed' => 'failed_at',
        ];
        return collect($statusDateMap)->map(function ($dateField, $status) use ($startDate, $endDate) {
            return [
                'name' => ucfirst(str_replace('_', ' ', $status)),
                'value' => TicketQueryService::queryForCurrentUser()
                    ->where('status', $status)
                    ->whereBetween($dateField, [$startDate, $endDate])
                    ->count(),
            ];
        })->values();
    }


    private function getTicketVolumeTrends()
    {
        $tickets = Ticket::get();
        return $tickets->groupBy(function ($ticket) {
            return $ticket->created_at->format('F Y');
        })->map(function ($group, $date) {
            return [
                'name' => $date,
                'Created' => $group->count(),
                'Resolved' => $group->where('status', 'resolved')->count(),
                'Reopened' => $group->where('status', 'reopened')->count(),
                'Failed' => $group->where('status', 'failed')->count(),
            ];
        })->sortKeys()->values();
    }


    private function getDepartmentResolutionTimes($currentStartDate, $currentEndDate, $previousStartDate, $previousEndDate)
    {
        $tickets = Ticket::with(['assignedTo.department'])
            ->whereNotNull('resolved_at')
            ->where(function ($query) use ($currentStartDate, $currentEndDate, $previousStartDate, $previousEndDate) {
                $query->whereBetween('resolved_at', [$currentStartDate, $currentEndDate])
                    ->orWhereBetween('resolved_at', [$previousStartDate, $previousEndDate]);
            })
            ->get();

        return $tickets
            ->groupBy(function ($ticket) {
                return $ticket->assignedTo->department->name ?? 'Unknown';
            })
            ->map(function ($tickets, $department) use ($currentStartDate, $currentEndDate, $previousStartDate, $previousEndDate) {
                $current = $tickets->filter(function ($ticket) use ($currentStartDate, $currentEndDate) {
                    return Carbon::parse($ticket->resolved_at)->between($currentStartDate, $currentEndDate);
                });

                $previous = $tickets->filter(function ($ticket) use ($previousStartDate, $previousEndDate) {
                    return Carbon::parse($ticket->resolved_at)->between($previousStartDate, $previousEndDate);
                });

                $currentAvg = $current->avg(function ($ticket) {
                    return Carbon::parse($ticket->created_at)->diffInMinutes(Carbon::parse($ticket->resolved_at));
                });

                $previousAvg = $previous->avg(function ($ticket) {
                    return Carbon::parse($ticket->created_at)->diffInMinutes(Carbon::parse($ticket->resolved_at));
                });

                return [
                    'name' => $department,
                    'current_resolution_time' => round($currentAvg, 2),
                    'previous_resolution_time' => round($previousAvg, 2),
                ];
            })
            ->values();
    }

}
