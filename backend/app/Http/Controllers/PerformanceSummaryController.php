<?php

namespace App\Http\Controllers;

use App\Models\Ticket;

class PerformanceSummaryController extends Controller
{

    public function getPerformanceSummary()
    {
        $now = now();
        $currentStart = $now->copy()->subDays(30);
        $previousStart = $now->copy()->subDays(60);
        $previousEnd = $now->copy()->subDays(31);

        $currentMetrics = $this->calculatePerformanceMetrics($currentStart, $now);
        $previousMetrics = $this->calculatePerformanceMetrics($previousStart, $previousEnd);

        return response()->json([
            'current' => $currentMetrics,
            'previous' => $previousMetrics,
            // 'delta' => $this->calculatePerformanceDeltas($currentMetrics, $previousMetrics),
        ]);
    }

    private function calculatePerformanceMetrics($startDate, $endDate)
    {
        // $totalTickets = Ticket::whereBetween('created_at', [$startDate, $endDate])->count();
        // $resolvedTickets = Ticket::where('status', 'resolved')->whereBetween('resolved_at', [$startDate, $endDate])->count();

        // $avgFirstResponse = Ticket::whereNotNull('approved_at')
        //     ->whereBetween('approved_at', [$startDate, $endDate])
        //     ->get()
        //     ->avg(function ($ticket) {
        //         return $ticket->created_at?->diffInMinutes($ticket->approved_at);
        //     });

        // $avgResolution = Ticket::whereNotNull('resolved_at')
        //     ->whereBetween('resolved_at', [$startDate, $endDate])
        //     ->get()
        //     ->avg(function ($ticket) {
        //         return $ticket->start_at?->diffInMinutes($ticket->resolved_at);
        //     });

        // $slaMet = Ticket::where('status', 'resolved')
        //     ->where('sla_breached', false)
        //     ->whereBetween('resolved_at', [$startDate, $endDate])
        //     ->count();

        // $slaTotal = Ticket::where('status', 'resolved')
        //     ->whereBetween('resolved_at', [$startDate, $endDate])
        //     ->count();

        // $slaCompliance = $slaTotal > 0 ? round(($slaMet / $slaTotal) * 100, 2) : 0;

        // $monthlyTrends = Ticket::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, count(*) as count')
        //     ->whereBetween('created_at', [$startDate->copy()->subMonths(6), $endDate])
        //     ->groupBy('month')
        //     ->orderBy('month')
        //     ->get();

        return [
            // 'totalTickets' => $totalTickets,
            // 'resolvedTickets' => $resolvedTickets,
            // 'averageFirstResponseTime' => $avgFirstResponse ? round($avgFirstResponse, 2) : 0,
            // 'averageResolutionTime' => $avgResolution ? round($avgResolution, 2) : 0,
            // 'slaCompliance' => $slaCompliance,
            // 'monthlyTrends' => $monthlyTrends,
        ];
    }

    // private function calculatePerformanceDeltas($current, $previous)
    // {
    //     return [
    //         'totalTicketsDelta' => $this->calculateDelta($current['totalTickets'], $previous['totalTickets']),
    //         'resolvedTicketsDelta' => $this->calculateDelta($current['resolvedTickets'], $previous['resolvedTickets']),
    //         'averageFirstResponseTimeDelta' => $this->calculateDelta($current['averageFirstResponseTime'], $previous['averageFirstResponseTime']),
    //         'averageResolutionTimeDelta' => $this->calculateDelta($current['averageResolutionTime'], $previous['averageResolutionTime']),
    //         'slaComplianceDelta' => $this->calculateDelta($current['slaCompliance'], $previous['slaCompliance']),
    //     ];
    // }
}
