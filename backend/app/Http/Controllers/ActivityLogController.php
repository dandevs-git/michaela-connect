<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Http\Requests\StoreActivityLogRequest;
use App\Http\Requests\UpdateActivityLogRequest;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logs = ActivityLog::with('user')->latest()->get();
        return response()->json($logs, 200);
    }

    public function getTicketLogs(Request $request)
    {
        $category = $request->query('category', 'Ticket Management');

        $logs = ActivityLog::with('user')
            ->where('category', $category)
            ->get();

        return response()->json($logs, 200);
    }
    public function getUserLogs(Request $request)
    {
        $category = $request->query('category', 'User Management');

        $logs = ActivityLog::with('user')
            ->where('category', $category)
            ->get();

        return response()->json($logs, 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ActivityLog $activityLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ActivityLog $activityLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActivityLog $activityLog)
    {
        //
    }
}
