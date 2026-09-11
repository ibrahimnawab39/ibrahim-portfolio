<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Index', [
            'profile' => Profile::query()->first(),
            'projects' => Project::query()->orderBy('order')->get(),
            'experiences' => Experience::query()->orderBy('order')->get(),
            'certificates' => Certificate::query()->orderBy('order')->get(),
            'skills' => Skill::query()->orderBy('category')->orderBy('order')->get(),
            'messages' => ContactMessage::query()->latest()->get(),
            'stats' => [
                'projects' => Project::query()->count(),
                'experiences' => Experience::query()->count(),
                'skills' => Skill::query()->count(),
                'certificates' => Certificate::query()->count(),
                'unreadMessages' => ContactMessage::query()->whereNull('read_at')->count(),
            ],
        ]);
    }

    public function updateProfile(Request $request): RedirectResponse
    {
        $profile = Profile::query()->firstOrFail();
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'headline' => ['required', 'string', 'max:180'],
            'location' => ['nullable', 'string', 'max:120'],
            'summary' => ['nullable', 'string', 'max:500'],
            'bio' => ['nullable', 'string', 'max:3000'],
            'email' => ['nullable', 'email', 'max:150'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'availability' => ['required', 'string', 'max:150'],
            'years_experience' => ['required', 'integer', 'min:0', 'max:60'],
            'photo' => ['nullable', 'image', 'max:5120'],
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo_path'] = '/storage/'.$request->file('photo')->store('portfolio/profile', 'public');
        }

        unset($validated['photo']);
        $profile->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }

    public function storeProject(Request $request): RedirectResponse
    {
        Project::query()->create($this->projectData($request));

        return back()->with('success', 'Project added successfully.');
    }

    public function updateProject(Request $request, Project $project): RedirectResponse
    {
        $project->update($this->projectData($request, $project));

        return back()->with('success', 'Project updated successfully.');
    }

    public function destroyProject(Project $project): RedirectResponse
    {
        $project->delete();

        return back()->with('success', 'Project deleted.');
    }

    public function reorderProjects(Request $request): RedirectResponse
    {
        $ids = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'distinct', 'exists:projects,id'],
        ])['ids'];

        DB::transaction(fn () => collect($ids)->each(
            fn (int $id, int $order) => Project::query()->whereKey($id)->update(['order' => $order])
        ));

        return back()->with('success', 'Project order updated.');
    }

    public function storeExperience(Request $request): RedirectResponse
    {
        Experience::query()->create($this->experienceData($request));

        return back()->with('success', 'Experience added successfully.');
    }

    public function updateExperience(Request $request, Experience $experience): RedirectResponse
    {
        $experience->update($this->experienceData($request));

        return back()->with('success', 'Experience updated successfully.');
    }

    public function destroyExperience(Experience $experience): RedirectResponse
    {
        $experience->delete();

        return back()->with('success', 'Experience deleted.');
    }

    public function reorderExperiences(Request $request): RedirectResponse
    {
        $ids = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'distinct', 'exists:experiences,id'],
        ])['ids'];

        DB::transaction(fn () => collect($ids)->each(
            fn (int $id, int $order) => Experience::query()->whereKey($id)->update(['order' => $order])
        ));

        return back()->with('success', 'Experience order updated.');
    }

    public function storeCertificate(Request $request): RedirectResponse
    {
        Certificate::query()->create($this->certificateData($request));

        return back()->with('success', 'Certificate added successfully.');
    }

    public function updateCertificate(Request $request, Certificate $certificate): RedirectResponse
    {
        $certificate->update($this->certificateData($request));

        return back()->with('success', 'Certificate updated successfully.');
    }

    public function destroyCertificate(Certificate $certificate): RedirectResponse
    {
        $certificate->delete();

        return back()->with('success', 'Certificate deleted.');
    }

    public function storeSkill(Request $request): RedirectResponse
    {
        Skill::query()->create($this->skillData($request));

        return back()->with('success', 'Skill added successfully.');
    }

    public function updateSkill(Request $request, Skill $skill): RedirectResponse
    {
        $skill->update($this->skillData($request));

        return back()->with('success', 'Skill updated successfully.');
    }

    public function destroySkill(Skill $skill): RedirectResponse
    {
        $skill->delete();

        return back()->with('success', 'Skill deleted.');
    }

    public function markMessageRead(ContactMessage $message): RedirectResponse
    {
        $message->update(['read_at' => now()]);

        return back()->with('success', 'Message marked as read.');
    }

    public function destroyMessage(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        return back()->with('success', 'Message deleted.');
    }

    private function projectData(Request $request, ?Project $project = null): array
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'slug' => ['required', 'alpha_dash', 'max:180', Rule::unique('projects', 'slug')->ignore($project)],
            'category' => ['nullable', 'string', 'max:120'],
            'company' => ['nullable', 'string', 'max:180'],
            'summary' => ['required', 'string', 'max:700'],
            'description' => ['nullable', 'string', 'max:5000'],
            'tech_stack' => ['nullable', 'string', 'max:1000'],
            'live_url' => ['nullable', 'url', 'max:255'],
            'repo_url' => ['nullable', 'url', 'max:255'],
            'featured' => ['nullable', 'boolean'],
            'order' => ['required', 'integer', 'min:0'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        $validated['featured'] = $request->boolean('featured');
        $validated['tech_stack'] = collect(explode(',', $validated['tech_stack'] ?? ''))
            ->map(fn (string $item) => trim($item))
            ->filter()
            ->values()
            ->all();

        if ($request->hasFile('image')) {
            $validated['image_path'] = '/storage/'.$request->file('image')->store('portfolio/projects', 'public');
        }

        unset($validated['image']);

        return $validated;
    }

    private function experienceData(Request $request): array
    {
        return $request->validate([
            'role' => ['required', 'string', 'max:180'],
            'company' => ['required', 'string', 'max:180'],
            'employment_type' => ['nullable', 'string', 'max:80'],
            'work_mode' => ['nullable', Rule::in(['Remote', 'On-site', 'Hybrid'])],
            'location' => ['nullable', 'string', 'max:120'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'description' => ['nullable', 'string', 'max:3000'],
            'order' => ['required', 'integer', 'min:0'],
        ]);
    }

    private function skillData(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string', 'max:100'],
            'proficiency' => ['required', 'integer', 'min:1', 'max:100'],
            'order' => ['required', 'integer', 'min:0'],
        ]);
    }

    private function certificateData(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'issuer' => ['required', 'string', 'max:180'],
            'issue_date' => ['nullable', 'date'],
            'credential_url' => ['nullable', 'url', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'order' => ['required', 'integer', 'min:0'],
        ]);
    }
}
