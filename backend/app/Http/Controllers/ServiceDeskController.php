<?php

namespace App\Http\Controllers;

use App\Services\MyTicketQueryService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ServiceDeskController extends Controller
{
    public function getMyOverview()
    {
        $now = Carbon::now();
        $currentPeriodStart = $now->copy()->subDays(30);
        $previousPeriodStart = $now->copy()->subDays(60);
        $previousPeriodEnd = $now->copy()->subDays(31);

        $currentMetrics = $this->calculateMetrics($currentPeriodStart, $now);
        $previousMetrics = $this->calculateMetrics($previousPeriodStart, $previousPeriodEnd);

        $myTicketVolume = $this->getTicketVolumeTrends(MyTicketQueryService::class);

        return response()->json([
            'current' => $currentMetrics,
            'previous' => $previousMetrics,
            'delta' => $this->calculateDeltas($currentMetrics, $previousMetrics),
            'myVolumeTrends' => $myTicketVolume,
        ]);
    }


    private function calculateMetrics($startDate, $endDate)
    {
        return [
            // My Overview
            'myAllTickets' => MyTicketQueryService::queryForCurrentUser()->whereBetween('created_at', [$startDate, $endDate])->count(),
            'myOpenTickets' => MyTicketQueryService::queryForCurrentUser()->open()->whereBetween('created_at', [$startDate, $endDate])->count(),
            'myInProgressTickets' => MyTicketQueryService::queryForCurrentUser()->inProgress()->whereBetween('created_at', [$startDate, $endDate])->count(),
            'myOverdueTickets' => MyTicketQueryService::queryForCurrentUser()->overdue()->whereBetween('created_at', [$startDate, $endDate])->count(),
            'myClosedTickets' => MyTicketQueryService::queryForCurrentUser()->closed()->whereBetween('created_at', [$startDate, $endDate])->count(),
            'mySlaCompliance' => $this->calculateSlaCompliance(MyTicketQueryService::class, $startDate, $endDate),
            'myResolutionTime' => $this->calculateAverageResolutionTime(MyTicketQueryService::class, $startDate, $endDate),
            'myFailedTickets' => MyTicketQueryService::queryForCurrentUser()->failed()->whereBetween('created_at', [$startDate, $endDate])->count(),
        ];
    }


    private function calculateDeltas($current, $previous)
    {
        return [
            // My Overview
            'myAllTicketsDelta' => $this->calculateDelta($current['myAllTickets'], $previous['myAllTickets']),
            'myOpenTicketsDelta' => $this->calculateDelta($current['myOpenTickets'], $previous['myOpenTickets']),
            'myInProgressTicketsDelta' => $this->calculateDelta($current['myInProgressTickets'], $previous['myInProgressTickets']),
            'myOverdueTicketsDelta' => $this->calculateDelta($current['myOverdueTickets'], $previous['myOverdueTickets']),
            'myClosedTicketsDelta' => $this->calculateDelta($current['myClosedTickets'], $previous['myClosedTickets']),
            'mySlaComplianceDelta' => $this->calculateDelta($current['mySlaCompliance'], $previous['mySlaCompliance']),
            'myResolutionTimeDelta' => $this->calculateDelta($current['myResolutionTime'], $previous['myResolutionTime']),
            'myFailedTicketsDelta' => $this->calculateDelta($current['myFailedTickets'], $previous['myFailedTickets']),
        ];
    }


    private function calculateDelta($currentValue, $previousValue)
    {
        if ($previousValue == 0) {
            return $currentValue == 0 ? 0 : $currentValue;
        }
        return round($currentValue - $previousValue, 2);
    }



    private function calculateSlaCompliance($queryService, $startDate, $endDate)
    {
        $resolvedOnTime = $queryService::queryForCurrentUser()->resolved()
            ->whereBetween('resolved_at', [$startDate, $endDate])
            ->where('sla_breached', false)
            ->count();

        $totalResolved = $queryService::queryForCurrentUser()->resolved()
            ->whereBetween('resolved_at', [$startDate, $endDate])
            ->count();

        return $totalResolved > 0 ? round(($resolvedOnTime / $totalResolved) * 100, 2) : 0;
    }


    private function calculateAverageResolutionTime($queryService, $startDate, $endDate)
    {
        $resolvedTickets = $queryService::queryForCurrentUser()->resolved()
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


    private function getTicketVolumeTrends($queryService)
    {
        $tickets = $queryService::queryForCurrentUser()->get();

        return $tickets
            ->groupBy(function ($ticket) {
                return $ticket->created_at->format('Y-m-d');
            })
            ->sortKeys()
            ->map(function ($group, $key) {
                $date = Carbon::createFromFormat('Y-m-d', $key);
                return [
                    'date' => $date->format('Y-m-d'),
                    'name' => $date->format('F j, Y'),
                    'Created' => $group->count(),
                    'Resolved' => $group->where('status', 'resolved')->count(),
                    'Reopened' => $group->where('status', 'reopened')->count(),
                    'Failed' => $group->where('status', 'failed')->count(),
                ];
            })
            ->values();
    }
}
