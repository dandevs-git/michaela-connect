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
        $ipaddress = IpAddress::with('user.department')->get();
        return response()->json($ipaddress, 200);
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
    public function show(IpAddress $ipAddress)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, IpAddress $ipAddress)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(IpAddress $ipAddress)
    {
        //
    }
}
