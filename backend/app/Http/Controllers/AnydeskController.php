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
        $anydesk = Anydesk::all();
        return response()->json($anydesk, 200);
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
    public function show(Anydesk $anydesk)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Anydesk $anydesk)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anydesk $anydesk)
    {
        //
    }
}
