<?php
namespace App\Http\Controllers;
use App\Http\Requests\SectionRequest;
use App\Models\Section;
use Illuminate\Http\RedirectResponse;
class SectionController extends Controller
{
    public function store(SectionRequest $request): RedirectResponse { Section::create($request->validated()); return back()->with('success','Section created.'); }
    public function update(SectionRequest $request, Section $section): RedirectResponse { $section->update($request->validated()); return back()->with('success','Section updated.'); }
    public function destroy(Section $section): RedirectResponse { $section->delete(); return back()->with('success','Section deleted.'); }
}
