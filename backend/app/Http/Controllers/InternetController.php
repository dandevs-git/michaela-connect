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
        $internet = Internet::all();
        return response()->json($internet, 200);
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
    public function show(Internet $internet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Internet $internet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Internet $internet)
    {
        //
    }
}
