<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getDashboardData()
    {
        $currentDate = Carbon::now();
        $pastDate = Carbon::now()->subDays(30);

        // Total tickets
        $totalTickets = Ticket::count();

        // Resolved tickets count
        $resolvedTickets = Ticket::resolved()->count();

        // SLA compliance
        $slaCompliance = $this->calculateSlaCompliance($currentDate, $pastDate);

        // Average resolution time
        $avgResolutionTime = $this->calculateAverageResolutionTime($currentDate, $pastDate);

        // Average response time
        $avgResponseTime = $this->calculateAverageResponseTime($currentDate, $pastDate);

        // Pending approvals
        $pendingApprovals = Ticket::pending()->count();

        // Ticket deltas for current and past month
        $totalTicketsDelta = $this->getDelta($totalTickets, Ticket::whereBetween('created_at', [$pastDate, $currentDate])->count());
        $resolvedTicketsDelta = $this->getDelta($resolvedTickets, Ticket::resolved()->whereBetween('updated_at', [$pastDate, $currentDate])->count());
        $slaComplianceDelta = $this->getDelta($slaCompliance, $this->calculateSlaCompliance($pastDate, $pastDate));
        $avgResolutionTimeDelta = $this->getDelta($avgResolutionTime, $this->calculateAverageResolutionTime($pastDate, $pastDate));
        $avgResponseTimeDelta = $this->getDelta($avgResponseTime, $this->calculateAverageResponseTime($pastDate, $pastDate));
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
            ->whereBetween('updated_at', [$startDate, $endDate])
            ->where('sla_breached', false)
            ->count();

        $totalResolved = Ticket::resolved()
            ->whereBetween('updated_at', [$startDate, $endDate])
            ->count();
        return $totalResolved > 0 ? ($resolvedOnTime / $totalResolved) * 100 : 0;
    }

    private function calculateAverageResolutionTime($startDate, $endDate)
    {
        $resolvedTickets = Ticket::resolved()->whereBetween('updated_at', [$startDate, $endDate])->get();
        $totalResolutionTime = 0;
        $ticketCount = 0;

        foreach ($resolvedTickets as $ticket) {
            if ($ticket->resolved_at) {
                // Assuming resolved_at exists and is formatted in the Ticket model
                $totalResolutionTime += $ticket->resolved_at->diffInMinutes($ticket->created_at);
                $ticketCount++;
            }
        }

        return $ticketCount > 0 ? round($totalResolutionTime / $ticketCount, 2) : 0;
    }

    private function calculateAverageResponseTime($startDate, $endDate)
    {
        $tickets = Ticket::where('status', '!=', 'new')->whereBetween('created_at', [$startDate, $endDate])->get();
        $totalResponseTime = 0;
        $ticketCount = 0;

        foreach ($tickets as $ticket) {
            if ($ticket->first_response_at) {
                $totalResponseTime += $ticket->first_response_at->diffInMinutes($ticket->created_at);
                $ticketCount++;
            }
        }

        return $ticketCount > 0 ? round($totalResponseTime / $ticketCount, 2) : 0;
    }

    private function getDelta($currentValue, $previousValue)
    {
        return round(($currentValue - $previousValue), 2);
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
            ->orderByRaw("STR_TO_DATE(month, '%M')") // Ensure correct month order
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
