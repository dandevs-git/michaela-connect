<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $feedback = Feedback::with('user.department')->latest()->get();
        return response()->json($feedback);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'comment' => 'required|string|max:1000',
            'type' => 'nullable|string|max:50', // e.g. 'bug', 'suggestion'
            'source' => 'nullable|string|max:100', // e.g. 'dashboard', 'report'
            'severity' => 'nullable|string|max:20', // e.g. 'low', 'high'
            'version' => 'nullable|string|max:20', // e.g. 'v1.2.0'
        ]);

        $feedback = Feedback::create([
            'user_id' => Auth::id(),
            'comment' => $validated['comment'],
            'type' => $validated['type'] ?? null,
            'source' => $validated['source'] ?? null,
            'severity' => $validated['severity'] ?? null,
            'version' => $validated['version'] ?? null,
            'status' => 'new', // default status
        ]);

        return response()->json([
            'message' => 'Feedback submitted successfully.',
            'data' => $feedback
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $feedback = Feedback::with('user')->findOrFail($id);

        return response()->json($feedback);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $feedback = Feedback::findOrFail($id);

        $feedback->update($request->only('status'));

        return response()->json([
            'message' => 'Feedback updated.',
            'data' => $feedback
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->delete();

        return response()->json(['message' => 'Feedback deleted.']);

    }
}
