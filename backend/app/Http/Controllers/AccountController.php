<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index()
    {
        return response()->json(Account::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type'             => 'nullable|string|max:255',
            'link'             => 'nullable|url|max:255',
            'username'         => 'nullable|string|max:255',
            'password'         => 'nullable|string|max:255',
            'department'       => 'nullable|string|max:255',
            'person_used'      => 'nullable|string|max:255',
            'purpose'          => 'nullable|string|max:255',
            'recovery_email'   => 'nullable|email|max:255',
            'recovery_number'  => 'nullable|string|max:20',
            'verification'     => 'nullable|string|max:255',
            'description'      => 'nullable|string',
        ]);

        $account = Account::create($validated);

        return response()->json($account, 201);
    }

    public function show(Account $account)
    {
        return response()->json($account);
    }

    public function update(Request $request, Account $account)
    {
        $validated = $request->validate([
            'type'             => 'nullable|string|max:255',
            'link'             => 'nullable|url|max:255',
            'username'         => 'nullable|string|max:255',
            'password'         => 'nullable|string|max:255',
            'department'       => 'nullable|string|max:255',
            'person_used'      => 'nullable|string|max:255',
            'purpose'          => 'nullable|string|max:255',
            'recovery_email'   => 'nullable|email|max:255',
            'recovery_number'  => 'nullable|string|max:20',
            'verification'     => 'nullable|string|max:255',
            'description'      => 'nullable|string',
        ]);

        $account->update($validated);

        return response()->json($account);
    }

    public function destroy(Account $account)
    {
        $account->delete();

        return response()->json(null, 204);
    }
}
