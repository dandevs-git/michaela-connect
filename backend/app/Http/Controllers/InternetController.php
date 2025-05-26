<?php

namespace App\Http\Controllers;

use App\Models\Internet;
use Illuminate\Http\Request;

class InternetController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $internet = Internet::with('user.department')->orderBy('created_at', 'desc')->get();
        return response()->json($internet, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string',
            'provider' => 'required|string',
            'gateway' => 'required|string',
            'cable_code' => 'required|string|unique:internets,cable_code',
            'location' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $internet = Internet::create($validated);

        return response()->json([
            'message' => 'Internet created successfully.',
            'data' => $internet,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Internet $internet)
    {
        return response()->json($internet->load('user.department'), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Internet $internet)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string',
            'provider' => 'required|string',
            'gateway' => 'required|string',
            'cable_code' => 'required|string|unique:internets,cable_code,' . $internet->id . ',id',
            'location' => 'nullable|string',
            'description' => 'nullable|string',
        ]);


        $internet->update($validated);

        return response()->json([
            'message' => 'Internet updated successfully.',
            'data' => $internet,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Internet $internet)
    {
        $internet->delete();

        return response()->json([
            'message' => 'Internet deleted successfully.',
        ], 200);
    }
}
