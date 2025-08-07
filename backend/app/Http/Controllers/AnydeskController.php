<?php

namespace App\Http\Controllers;

use App\Models\Anydesk;
use Illuminate\Http\Request;

class AnydeskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $anydesk = Anydesk::with('user.department')->latest()->get();
        return response()->json($anydesk, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'number' => 'required|string|unique:anydesks,number',
            'password' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $anydesk = Anydesk::create($validated);

        return response()->json([
            'message' => 'Anydesk created successfully.',
            'data' => $anydesk
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Anydesk $anydesk)
    {
        $anydesk->load('user.department');
        return response()->json($anydesk, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Anydesk $anydesk)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'number' => 'sometimes|string|unique:anydesks,number,' . $anydesk->id,
            'password' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $anydesk->update($validated);

        return response()->json([
            'message' => 'Anydesk updated successfully.',
            'data' => $anydesk
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anydesk $anydesk)
    {
        $anydesk->delete();

        return response()->json([
            'message' => 'Anydesk entry deleted successfully.'
        ], 200);
    }
}
