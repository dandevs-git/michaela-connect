<?php

namespace App\Http\Controllers;

use App\Models\DirectoryCategory;
use App\Models\DirectoryEntry;
use Illuminate\Http\Request;

class DirectoryController extends Controller
{
    public function index()
    {
        return response()->json(DirectoryEntry::with('category')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:directory_categories,id',
            'name' => 'required|unique:directory_entries,name',
            'attributes' => 'nullable|array'
        ]);

        $entry = DirectoryEntry::create($validated);

        return response()->json(['message' => 'Entry added successfully', 'entry' => $entry], 201);
    }

    // public function show($id)
    // {
    //     $entry = DirectoryEntry::with('category')->findOrFail($id);
    //     return response()->json($entry);
    // }

    public function show($category_name)
    {
        $category = DirectoryCategory::where('name', $category_name)->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $entries = DirectoryEntry::where('category_id', $category->id)->with('category')->get();

        if ($entries->isEmpty()) {
            return response()->json(['message' => 'No entries found for this category'], 404);
        }

        return response()->json($entries);
    }



    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:directory_categories,id',
            'name' => 'required|unique:directory_entries,name,' . $id,
            'attributes' => 'nullable|array'
        ]);

        $entry = DirectoryEntry::findOrFail($id);
        $entry->update($validated);

        return response()->json(['message' => 'Entry updated successfully', 'entry' => $entry]);
    }

    public function destroy($id)
    {
        $entry = DirectoryEntry::findOrFail($id);
        $entry->delete();

        return response()->json(['message' => 'Entry deleted successfully']);
    }
}
