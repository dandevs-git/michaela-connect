<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use App\Services\TeamTicketQueryService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{

    public function getTeamOverview()
    {
        $now = Carbon::now();
        $currentPeriodStart = $now->copy()->subDays(30);
        $previousPeriodStart = $now->copy()->subDays(60);
        $previousPeriodEnd = $now->copy()->subDays(31);

        $currentMetrics = $this->calculateMetrics($currentPeriodStart, $now);
        $previousMetrics = $this->calculateMetrics($previousPeriodStart, $previousPeriodEnd);

        $teamStatusData = $this->getTicketStatusData(TeamTicketQueryService::class, $currentPeriodStart, $now);
        $teamTicketVolume = $this->getTicketVolumeByPriority($currentPeriodStart, $now);
        $teamVolumeTrends = $this->getTicketVolumeTrends(TeamTicketQueryService::class);
        $teamDepartmentTimes = $this->getDepartmentResolutionTimes($currentPeriodStart, $now, $previousPeriodStart, $previousPeriodEnd);
        $teamWorkload = $this->getTeamWorkload($currentPeriodStart, $now, $previousPeriodStart, $previousPeriodEnd);
        $liveEmployeeStatus = $this->getLiveEmployeeStatus();

        return response()->json([
            'current' => $currentMetrics,
            'previous' => $previousMetrics,
            'delta' => $this->calculateDeltas($currentMetrics, $previousMetrics),
            'teamStatusData' => $teamStatusData,
            'teamTicketVolume' => $teamTicketVolume,
            'teamVolumeTrends' => $teamVolumeTrends,
            'teamDepartmentTimes' => $teamDepartmentTimes,
            'teamWorkload' => $teamWorkload,
            'liveEmployeeStatus' => $liveEmployeeStatus,
        ]);
    }

    private function calculateMetrics($startDate, $endDate)
    {
        return [
            // Team Overview
            'teamTotalTickets' => TeamTicketQueryService::queryForCurrentUser()->whereBetween('created_at', [$startDate, $endDate])->count(),
            'teamResolvedTickets' => TeamTicketQueryService::queryForCurrentUser()->resolved()->whereBetween('resolved_at', [$startDate, $endDate])->count(),
            'teamSlaCompliance' => $this->calculateSlaCompliance(TeamTicketQueryService::class, $startDate, $endDate),
            'teamAvgResolutionTime' => $this->calculateAverageResolutionTime(TeamTicketQueryService::class, $startDate, $endDate),
            'teamAvgResponseTime' => $this->calculateAverageResponseTime(TeamTicketQueryService::class, $startDate, $endDate),
            'teamPendingApprovals' => TeamTicketQueryService::queryForCurrentUser()->pending()->whereBetween('created_at', [$startDate, $endDate])->count(),
            'teamTotalClosedTickets' => TeamTicketQueryService::queryForCurrentUser()->closed()->whereBetween('created_at', [$startDate, $endDate])->count(),
        ];
    }

    private function calculateDeltas($current, $previous)
    {
        return [
            // Team Overview
            'teamTotalTicketsDelta' => $this->calculateDelta($current['teamTotalTickets'], $previous['teamTotalTickets']),
            'teamResolvedTicketsDelta' => $this->calculateDelta($current['teamResolvedTickets'], $previous['teamResolvedTickets']),
            'teamSlaComplianceDelta' => $this->calculateDelta($current['teamSlaCompliance'], $previous['teamSlaCompliance']),
            'teamAvgResolutionTimeDelta' => $this->calculateDelta($current['teamAvgResolutionTime'], $previous['teamAvgResolutionTime']),
            'teamAvgResponseTimeDelta' => $this->calculateDelta($current['teamAvgResponseTime'], $previous['teamAvgResponseTime']),
            'teamPendingApprovalsDelta' => $this->calculateDelta($current['teamPendingApprovals'], $previous['teamPendingApprovals']),
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

    private function calculateAverageResponseTime($queryService, $startDate, $endDate)
    {
        $tickets = $queryService::queryForCurrentUser()->whereBetween('approved_at', [$startDate, $endDate])->get();

        $totalResponseTime = $tickets->sum(function ($ticket) {
            return $ticket->created_at && $ticket->approved_at
                ? $ticket->created_at->diffInMinutes($ticket->approved_at)
                : 0;
        });

        $ticketCount = $tickets->filter(fn($ticket) => $ticket->created_at && $ticket->approved_at)->count();

        return $ticketCount > 0 ? round($totalResponseTime / $ticketCount, 2) : 0;
    }

    private function getTicketStatusData($queryService, $startDate, $endDate)
    {
        $statusDateMap = [
            'resolved' => 'resolved_at',
            'open' => 'approved_at',
            'in_progress' => 'start_at',
            'failed' => 'failed_at',
        ];

        return collect($statusDateMap)->map(function ($dateField, $status) use ($queryService, $startDate, $endDate) {
            return [
                'name' => ucfirst(str_replace('_', ' ', $status)),
                'value' => $queryService::queryForCurrentUser()
                    ->where('status', $status)
                    ->whereBetween($dateField, [$startDate, $endDate])
                    ->count(),
            ];
        })->values();
    }


    public function getTicketVolumeByPriority($start, $end)
    {
        $current = DB::table('tickets')
            ->join('priorities', 'tickets.priority_id', '=', 'priorities.id')
            ->select('priorities.name as priority', DB::raw('COUNT(*) as count'))
            ->whereNull('tickets.deleted_at')
            ->whereBetween('tickets.created_at', [$start, $end])
            ->groupBy('priorities.name')
            ->pluck('count', 'priority');

        $result = $current->map(function ($count, $priority) {
            return [
                'priority' => $priority,
                'value' => $count,
            ];
        })->values();

        return $result;
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
                return $ticket->assignedTo->department->name ?? 'Unassigned';
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

    private function getTeamWorkload($currentStartDate, $currentEndDate, $previousStartDate, $previousEndDate)
    {
        $tickets = TeamTicketQueryService::queryForCurrentUser()
            ->where(function ($query) use ($currentStartDate, $currentEndDate, $previousStartDate, $previousEndDate) {
                $query->whereBetween('created_at', [$currentStartDate, $currentEndDate])
                    ->orWhereBetween('created_at', [$previousStartDate, $previousEndDate]);
            })
            ->with('assignedTo')
            ->get();

        return $tickets
            ->groupBy(fn($ticket) => optional($ticket->assignedTo)->name ?? 'Unassigned')
            ->map(function ($group, $userName) use ($currentStartDate, $currentEndDate, $previousStartDate, $previousEndDate) {
                $current = $group->filter(
                    fn($ticket) =>
                    Carbon::parse($ticket->created_at)->between($currentStartDate, $currentEndDate)
                );

                $previous = $group->filter(
                    fn($ticket) =>
                    Carbon::parse($ticket->created_at)->between($previousStartDate, $previousEndDate)
                );

                return [
                    'name' => $userName,
                    'current_workload' => $current->count(),
                    'previous_workload' => $previous->count(),
                ];
            })
            ->values();
    }


    private function getLiveEmployeeStatus()
    {
        $onlineThreshold = now()->subMinutes(2);
        $awayThreshold = now()->subMinutes(30);

        $users = User::select('name', 'last_activity_at')
            ->get()
            ->map(function ($user) use ($onlineThreshold, $awayThreshold) {
                $lastSeen = $user->last_activity_at ? Carbon::parse($user->last_activity_at) : null;

                $status = 'Offline';

                if ($lastSeen) {
                    if ($lastSeen->greaterThanOrEqualTo($onlineThreshold)) {
                        $status = 'Online';
                    } elseif ($lastSeen->greaterThanOrEqualTo($awayThreshold)) {
                        $status = 'Away';
                    }
                }

                return [
                    'name' => $user->name,
                    'status' => $status,
                    'last_activity_at' => $lastSeen?->diffForHumans(),
                ];
            });

        return $users;
    }

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
            'delta' => $this->calculatePerformanceDeltas($currentMetrics, $previousMetrics),
        ]);
    }

    private function calculatePerformanceMetrics($startDate, $endDate)
    {
        $totalTickets = Ticket::whereBetween('created_at', [$startDate, $endDate])->count();
        $resolvedTickets = Ticket::where('status', 'resolved')->whereBetween('resolved_at', [$startDate, $endDate])->count();

        $avgFirstResponse = Ticket::whereNotNull('approved_at')
            ->whereBetween('approved_at', [$startDate, $endDate])
            ->get()
            ->avg(function ($ticket) {
                return $ticket->created_at?->diffInMinutes($ticket->approved_at);
            });

        $avgResolution = Ticket::whereNotNull('resolved_at')
            ->whereBetween('resolved_at', [$startDate, $endDate])
            ->get()
            ->avg(function ($ticket) {
                return $ticket->start_at?->diffInMinutes($ticket->resolved_at);
            });

        $slaMet = Ticket::where('status', 'resolved')
            ->where('sla_breached', false)
            ->whereBetween('resolved_at', [$startDate, $endDate])
            ->count();

        $slaTotal = Ticket::where('status', 'resolved')
            ->whereBetween('resolved_at', [$startDate, $endDate])
            ->count();

        $slaCompliance = $slaTotal > 0 ? round(($slaMet / $slaTotal) * 100, 2) : 0;

        $monthlyTrends = Ticket::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, count(*) as count')
            ->whereBetween('created_at', [$startDate->copy()->subMonths(6), $endDate])
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return [
            'totalTickets' => $totalTickets,
            'resolvedTickets' => $resolvedTickets,
            'averageFirstResponseTime' => $avgFirstResponse ? round($avgFirstResponse, 2) : 0,
            'averageResolutionTime' => $avgResolution ? round($avgResolution, 2) : 0,
            'slaCompliance' => $slaCompliance,
            'monthlyTrends' => $monthlyTrends,
        ];
    }

    private function calculatePerformanceDeltas($current, $previous)
    {
        return [
            'totalTicketsDelta' => $this->calculateDelta($current['totalTickets'], $previous['totalTickets']),
            'resolvedTicketsDelta' => $this->calculateDelta($current['resolvedTickets'], $previous['resolvedTickets']),
            'averageFirstResponseTimeDelta' => $this->calculateDelta($current['averageFirstResponseTime'], $previous['averageFirstResponseTime']),
            'averageResolutionTimeDelta' => $this->calculateDelta($current['averageResolutionTime'], $previous['averageResolutionTime']),
            'slaComplianceDelta' => $this->calculateDelta($current['slaCompliance'], $previous['slaCompliance']),
        ];
    }
}
