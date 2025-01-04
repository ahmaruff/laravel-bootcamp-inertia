<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reports = Report::with(['user', 'chirp'])->get();
        return Inertia::render('Admin/Reports/Index', [
            'user' => Auth::user(),
            'title' => 'Chrip Reports Management',
            'reports' => $reports,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'user_id' => ['required', 'exists:users,id'],
            'chirp_id' => ['required', 'exists:chirps,id'],
            'notes' => ['sometimes', 'nullable', 'string'],
            'is_resolved' => ['sometimes', 'nullable', 'boolean']
        ];

        $validator = Validator::make($request->all(), $rules);

        $validated = $validator->valid();

        $report = Report::create($validated);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        $report->load('user');
        $report->load('chirp');
        $report->load('chirp.user');

        return Inertia::render('Admin/Reports/Edit', [
            'user' => Auth::user(),
            'title' => 'Detail Report',
            'report' => $report,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
