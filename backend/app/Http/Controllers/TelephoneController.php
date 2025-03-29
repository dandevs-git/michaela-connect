<?php

namespace App\Http\Controllers;

use App\Models\Telephone;
use Illuminate\Http\Request;

class TelephoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $telephone = Telephone::all();
        return response()->json($telephone, 200);
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
    public function show(Telephone $telephone)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Telephone $telephone)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Telephone $telephone)
    {
        //
    }
}
