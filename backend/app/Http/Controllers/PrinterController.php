<?php

namespace App\Http\Controllers;

use App\Models\Printer;
use Illuminate\Http\Request;

class PrinterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $printers = Printer::with('user.department', 'user.anydesk', 'user.telephone', 'user.printer', 'user.ipAddress')
            ->latest()
            ->get();

        return response()->json($printers, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|unique:printers,name',
            'inkcode' => 'required|string|max:255',
        ]);

        $printer = Printer::create($validated);

        return response()->json([
            'message' => 'Printer created successfully.',
            'data' => $printer
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Printer $printer)
    {
        $printer->load('user.department', 'user.anydesk', 'user.telephone', 'user.printer', 'user.ipAddress');

        return response()->json($printer, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Printer $printer)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'name' => 'sometimes|string|unique:printers,name,' . $printer->id,
            'inkcode' => 'sometimes|string|max:255',
        ]);

        $printer->update($validated);

        return response()->json([
            'message' => 'Printer updated successfully.',
            'data' => $printer
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Printer $printer)
    {
        $printer->delete();

        return response()->json([
            'message' => 'Printer deleted successfully.'
        ], 200);
    }
}
