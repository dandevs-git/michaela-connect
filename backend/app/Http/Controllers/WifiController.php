<?php

namespace App\Http\Controllers;

use App\Models\Wifi;
use Illuminate\Http\Request;

class WifiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wifi = Wifi::with('user.department')->latest()->get();
        return response()->json($wifi, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'device' => 'required|string',
            'ip_address' => 'required|ip',
            'ssid' => 'required|string',
            'gateway' => 'required|ip',
            'mac_address' => 'nullable|string',
        ]);

        $wifi = Wifi::create($validated);

        return response()->json([
            'message' => 'WiFi record created successfully.',
            'data' => $wifi,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Wifi $wifi)
    {
        return response()->json($wifi->load('user.department'), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Wifi $wifi)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'device' => 'required|string',
            'ip_address' => 'required|ip',
            'ssid' => 'required|string',
            'gateway' => 'required|ip',
            'mac_address' => 'nullable|string',
        ]);

        $wifi->update($validated);

        return response()->json([
            'message' => 'WiFi record updated successfully.',
            'data' => $wifi,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wifi $wifi)
    {
        $wifi->delete();

        return response()->json([
            'message' => 'WiFi record deleted successfully.',
        ], 200);
    }
}
