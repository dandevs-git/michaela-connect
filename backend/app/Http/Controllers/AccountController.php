<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * Display a listing of the accounts.
     */
    public function index()
    {
        $accounts = Account::with('users.department')->latest()->get();
        return response()->json($accounts, 200);
    }

    /**
     * Store a newly created account in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_ids'         => 'required|array',
            'user_ids.*'       => 'exists:users,id',
            'type'             => 'nullable|string|max:255',
            'link'             => 'nullable|url|max:255',
            'username'         => 'nullable|string|max:255',
            'password'         => 'nullable|string|max:255',
            'department'       => 'nullable|string|max:255',
            'purpose'          => 'nullable|string|max:255',
            'recovery_email'   => 'nullable|email|max:255',
            'recovery_number'  => 'nullable|string|max:20',
            'verification'     => 'nullable|string|max:255',
            'description'      => 'nullable|string',
        ]);

        $account = Account::create($validated);

        // Attach multiple users to this account
        $account->users()->attach($validated['user_ids']);

        return response()->json([
            'message' => 'Account created successfully.',
            'data' => $account->load('users.department'),
        ], 201);
    }

    /**
     * Display the specified account.
     */
    public function show(Account $account)
    {
        return response()->json($account->load('users.department'), 200);
    }

    /**
     * Update the specified account in storage.
     */
    public function update(Request $request, Account $account)
    {
        $validated = $request->validate([
            'user_ids'         => 'nullable|array',
            'user_ids.*'       => 'exists:users,id',
            'type'             => 'nullable|string|max:255',
            'link'             => 'nullable|url|max:255',
            'username'         => 'nullable|string|max:255',
            'password'         => 'nullable|string|max:255',
            'department'       => 'nullable|string|max:255',
            'purpose'          => 'nullable|string|max:255',
            'recovery_email'   => 'nullable|email|max:255',
            'recovery_number'  => 'nullable|string|max:20',
            'verification'     => 'nullable|string|max:255',
            'description'      => 'nullable|string',
        ]);

        $account->update($validated);

        // If user_ids is passed, sync them
        if (isset($validated['user_ids'])) {
            $account->users()->sync($validated['user_ids']);
        }

        return response()->json([
            'message' => 'Account updated successfully.',
            'data' => $account->load('users.department'),
        ], 200);
    }

    /**
     * Remove the specified account from storage.
     */
    public function destroy(Account $account)
    {
        $account->delete();

        return response()->json([
            'message' => 'Account deleted successfully.',
        ], 200);
    }
}
