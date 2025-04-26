<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{

    // By Month
    // public function getDashboardData()
    // {
    //     $pastDate = Carbon::now('Asia/Manila')->subMonthNoOverflow()->startOfMonth()->toDateString();
    //     $currentDate = Carbon::now('Asia/Manila')->subMonthNoOverflow()->endOfMonth()->toDateString();

    //     $totalTickets = Ticket::whereBetween('created_at', [$pastDate, $currentDate])->count();

    //     $resolvedTickets = Ticket::resolved()->whereBetween('updated_at', [$pastDate, $currentDate])->count();

    //     $slaCompliance = $this->calculateSlaCompliance($pastDate, $currentDate);

    //     $avgResolutionTime = $this->calculateAverageResolutionTime($pastDate, $currentDate);

    //     $avgResponseTime = $this->calculateAverageResponseTime($pastDate, $currentDate);

    //     $pendingApprovals = Ticket::pending()->whereBetween('created_at', [$pastDate, $currentDate])->count();

    //     $prevPastDate = Carbon::now()->subMonthsNoOverflow(2)->startOfMonth()->toDateString();
    //     $prevCurrentDate = Carbon::now()->subMonthsNoOverflow(2)->endOfMonth()->toDateString();

    //     $totalTicketsDelta = $this->getDelta(
    //         $totalTickets,
    //         Ticket::whereBetween('created_at', [$prevPastDate, $prevCurrentDate])->count()
    //     );

    //     $resolvedTicketsDelta = $this->getDelta(
    //         $resolvedTickets,
    //         Ticket::resolved()->whereBetween('updated_at', [$prevPastDate, $prevCurrentDate])->count()
    //     );

    //     $slaComplianceDelta = $this->getDelta(
    //         $slaCompliance,
    //         $this->calculateSlaCompliance($prevPastDate, $prevCurrentDate)
    //     );

    //     $avgResolutionTimeDelta = $this->getDelta(
    //         $avgResolutionTime,
    //         $this->calculateAverageResolutionTime($prevPastDate, $prevCurrentDate)
    //     );

    //     $avgResponseTimeDelta = $this->getDelta(
    //         $avgResponseTime,
    //         $this->calculateAverageResponseTime($prevPastDate, $prevCurrentDate)
    //     );

    //     $pendingApprovalsDelta = $this->getDelta(
    //         $pendingApprovals,
    //         Ticket::pending()->whereBetween('created_at', [$prevPastDate, $prevCurrentDate])->count()
    //     );

    //     return response()->json([
    //         'prevPastDate' => $prevPastDate,
    //         'prevCurrentDate' => $prevCurrentDate,
    //         'pastDate' => $pastDate,
    //         'currentDate' => $currentDate,


    //         'totalTickets' => $totalTickets,
    //         'resolvedTickets' => $resolvedTickets,
    //         'slaCompliance' => $slaCompliance,
    //         'avgResolutionTime' => $avgResolutionTime,
    //         'avgResponseTime' => $avgResponseTime,
    //         'pendingApprovals' => $pendingApprovals,
    //         'totalTicketsDelta' => $totalTicketsDelta,
    //         'resolvedTicketsDelta' => $resolvedTicketsDelta,
    //         'slaComplianceDelta' => $slaComplianceDelta,
    //         'avgResolutionTimeDelta' => $avgResolutionTimeDelta,
    //         'avgResponseTimeDelta' => $avgResponseTimeDelta,
    //         'pendingApprovalsDelta' => $pendingApprovalsDelta,
    //     ]);
    // }


    // By Past 30 days
    public function getDashboardData()
    {
        $currentDate = Carbon::now()->toDateString();
        $pastDate = Carbon::now()->subDays(30)->toDateString();

        $totalTickets = Ticket::whereBetween('created_at', [$pastDate, $currentDate])->count();

        $resolvedTickets = Ticket::resolved()->whereBetween('resolved_at', [$pastDate, $currentDate])->count();

        $slaCompliance = $this->calculateSlaCompliance($pastDate, $currentDate);

        $avgResolutionTime = $this->calculateAverageResolutionTime($pastDate, $currentDate);

        $avgResponseTime = $this->calculateAverageResponseTime($pastDate, $currentDate);

        $pendingApprovals = Ticket::pending()->count();

        $totalTicketsDelta = $this->getDelta($totalTickets, Ticket::whereBetween('created_at', [$pastDate, $currentDate])->count());
        $resolvedTicketsDelta = $this->getDelta($resolvedTickets, Ticket::resolved()->whereBetween('updated_at', [$pastDate, $currentDate])->count());
        $slaComplianceDelta = $this->getDelta($slaCompliance, $this->calculateSlaCompliance($pastDate, $currentDate));
        $avgResolutionTimeDelta = $this->getDelta($avgResolutionTime, $this->calculateAverageResolutionTime($pastDate, $currentDate));
        $avgResponseTimeDelta = $this->getDelta($avgResponseTime, $this->calculateAverageResponseTime($pastDate, $currentDate));
        $pendingApprovalsDelta = $this->getDelta($pendingApprovals, Ticket::pending()->whereBetween('created_at', [$pastDate, $currentDate])->count());

        return response()->json([
            'totalTickets' => $totalTickets,
            'resolvedTickets' => $resolvedTickets,
            'slaCompliance' => $slaCompliance,
            'avgResolutionTime' => $avgResolutionTime,
            'avgResponseTime' => $avgResponseTime,
            'pendingApprovals' => $pendingApprovals,
            'totalTicketsDelta' => $totalTicketsDelta,
            'resolvedTicketsDelta' => $resolvedTicketsDelta,
            'slaComplianceDelta' => $slaComplianceDelta,
            'avgResolutionTimeDelta' => $avgResolutionTimeDelta,
            'avgResponseTimeDelta' => $avgResponseTimeDelta,
            'pendingApprovalsDelta' => $pendingApprovalsDelta,
        ]);
    }

    private function calculateSlaCompliance($startDate, $endDate)
    {
        $resolvedOnTime = Ticket::resolved()
            ->whereBetween('resolved_at', [$startDate, $endDate])
            ->where('sla_breached', false)
            ->count();

        $totalResolved = Ticket::resolved()
            ->whereBetween('resolved_at', [$startDate, $endDate])
            ->count();

        $percentage = $totalResolved > 0 ? ($resolvedOnTime / $totalResolved) * 100 : 0;

        return round($percentage, 2);
    }

    private function calculateAverageResolutionTime($startDate, $endDate)
    {
        // Ito po ay from start_at to resolved_at
        $resolvedTickets = Ticket::resolved()
            ->whereBetween('resolved_at', [$startDate, $endDate])
            ->get();

        $totalResolutionTime = 0;
        $ticketCount = 0;

        foreach ($resolvedTickets as $ticket) {
            if ($ticket->resolved_at && $ticket->start_at) {
                $totalResolutionTime += $ticket->start_at->diffInMinutes($ticket->resolved_at);
                $ticketCount++;
            }
        }
        return $ticketCount > 0 ? round($totalResolutionTime / $ticketCount, 2) : 0;
    }

    private function calculateAverageResponseTime($startDate, $endDate)
    {
        // Ito po ay from created_at to approved_at
        $tickets = Ticket::where('status', '!=', 'new')->whereBetween('approved_at', [$startDate, $endDate])->get();
        $totalResponseTime = 0;
        $ticketCount = 0;

        foreach ($tickets as $ticket) {
            if ($ticket->approved_at && $ticket->created_at) {
                $totalResponseTime += $ticket->created_at->diffInMinutes($ticket->approved_at);
                $ticketCount++;
            }
        }

        return $ticketCount > 0 ? round($totalResponseTime / $ticketCount, 2) : 0;
    }

    private function getDelta($currentValue, $previousValue)
    {
        if (is_numeric($currentValue) && is_numeric($previousValue)) {
            return round($currentValue - $previousValue, 2);
        }

        if (is_string($currentValue) && preg_match('/^\d{2}:\d{2}$/', $currentValue)) {
            [$currH, $currM] = explode(':', $currentValue);
            [$prevH, $prevM] = explode(':', $previousValue);

            $currentMinutes = ((int) $currH * 60) + (int) $currM;
            $previousMinutes = ((int) $prevH * 60) + (int) $prevM;

            return $currentMinutes - $previousMinutes;
        }

        return 0;
    }



    public function ticketStatusData()
    {
        $data = [
            ['name' => 'Resolved', 'value' => Ticket::where('status', 'resolved')->count()],
            ['name' => 'Open', 'value' => Ticket::where('status', 'open')->count()],
            ['name' => 'In Progress', 'value' => Ticket::where('status', 'in_progress')->count()],
            ['name' => 'Failed', 'value' => Ticket::where('status', 'failed')->count()],
        ];
        return response()->json($data);
    }

    public function ticketVolumeTrends()
    {
        $trends = Ticket::selectRaw("
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
        $departments = Ticket::with(['assignedTo.department'])
            ->whereNotNull('resolved_at')
            ->get()
            ->flatMap(function ($ticket) {
                $resolutionTime = Carbon::parse($ticket->created_at)->diffInMinutes(Carbon::parse($ticket->resolved_at));
                return [
                    ['department' => $ticket->assignedTo->department->name ?? null, 'resolution_time' => $resolutionTime]
                ];
            })
            ->filter(fn($item) => !is_null($item['department']))
            ->groupBy('department')
            ->map(function ($tickets, $department) {
                $avgResolutionTime = collect($tickets)->avg('resolution_time');
                return ['name' => $department, 'resolution_time' => round($avgResolutionTime, 2)];
            })
            ->values();
        return response()->json($departments);
    }
}
