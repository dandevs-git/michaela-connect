<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Services\TicketQueryService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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

        return response()->json([
            'current' => $currentMetrics,
            'previous' => $previousMetrics,
            'delta' => $this->calculateDeltas($currentMetrics, $previousMetrics),
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
            return $currentValue == 0 ? 0 : 100;
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

    public function ticketStatusData()
    {
        $statuses = ['resolved', 'open', 'in_progress', 'failed'];

        $data = collect($statuses)->map(function ($status) {
            return [
                'name' => ucfirst(str_replace('_', ' ', $status)),
                'value' => TicketQueryService::queryForCurrentUser()->where('status', $status)->count()
            ];
        });

        return response()->json($data);
    }

    public function ticketVolumeTrends()
    {
        $trends = TicketQueryService::queryForCurrentUser()->selectRaw("
            DATE_FORMAT(created_at, '%M') as month,
            COUNT(*) as Created,
            SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as Resolved,
            SUM(CASE WHEN status = 'reopened' THEN 1 ELSE 0 END) as Reopened,
            SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as Failed
        ")
            ->groupBy('month')
            ->orderByRaw("STR_TO_DATE(month, '%M')")
            ->get();

        return response()->json($trends);
    }

    public function departmentResolutionTime()
    {
        $departments = TicketQueryService::queryForCurrentUser()->with(['assignedTo.department'])
            ->whereNotNull('resolved_at')
            ->get()
            ->groupBy(function ($ticket) {
                return $ticket->assignedTo->department->name ?? 'Unknown';
            })
            ->map(function ($tickets, $department) {
                $avgResolutionTime = $tickets->avg(function ($ticket) {
                    return Carbon::parse($ticket->created_at)->diffInMinutes(Carbon::parse($ticket->resolved_at));
                });
                return [
                    'name' => $department,
                    'resolution_time' => round($avgResolutionTime, 2)
                ];
            })
            ->values();

        return response()->json($departments);
    }
}
