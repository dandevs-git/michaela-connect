<?php

namespace App\Http\Controllers;

use App\Models\Telephone;
use Illuminate\Http\Request;

class TelephoneController extends Controller
{
    /**
     * Display a listing of the telephones.
     */
    public function index()
    {
        $telephones = Telephone::with('user.department')->orderBy('created_at', 'desc')->get();
        return response()->json($telephones, 200);
    }

    /**
     * Store a newly created telephone in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'number' => 'required|string|unique:telephones,number',
            'cable_code' => 'required|string|unique:telephones,cable_code',
            'location' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $telephone = Telephone::create($validated);

        return response()->json([
            'message' => 'Telephone created successfully.',
            'data' => $telephone,
        ], 201);
    }

    /**
     * Display the specified telephone.
     */
    public function show(Telephone $telephone)
    {
        return response()->json($telephone->load('user.department'), 200);
    }

    /**
     * Update the specified telephone in storage.
     */
    public function update(Request $request, Telephone $telephone)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'number' => 'required|string|unique:telephones,number,' . $telephone->id . ',id',
            'cable_code' => 'required|string|unique:telephones,cable_code,' . $telephone->id . ',id',
            'location' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $telephone->update($validated);

        return response()->json([
            'message' => 'Telephone updated successfully.',
            'data' => $telephone,
        ], 200);
    }




    /**
     * Remove the specified telephone from storage.
     */
    public function destroy(Telephone $telephone)
    {
        $telephone->delete();

        return response()->json([
            'message' => 'Telephone deleted successfully.',
        ], 200);
    }
}
