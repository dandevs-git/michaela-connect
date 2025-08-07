<?php

namespace App\Http\Controllers;

use App\Models\IpAddress;
use Illuminate\Http\Request;

class IpAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ipAddresses = IpAddress::with('user.department')->latest()->get();
        return response()->json($ipAddresses, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'ip' => 'required|ip|unique:ip_addresses,ip',
            'type' => 'nullable|string',
            'assigned_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $ip = IpAddress::create($validated);

        return response()->json(['message' => 'IP address created', 'ip' => $ip], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(IpAddress $ipAddress)
    {
        $ipAddress->load('user.department');
        return response()->json($ipAddress, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, IpAddress $ipAddress)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'ip' => 'required|ip|unique:ip_addresses,ip,' . $ipAddress->id . ',id',
            'type' => 'nullable|string',
            'assigned_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);


        $ipAddress->update($validated);

        return response()->json(['message' => 'IP address updated', 'ip' => $ipAddress], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(IpAddress $ipAddress)
    {
        $ipAddress->delete();
        return response()->json(['message' => 'IP address deleted'], 200);
    }
}
