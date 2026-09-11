<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function home(): Response
    {
        $firstExperience = Experience::query()->whereNotNull('start_date')->min('start_date');
        $experienceMonths = $firstExperience
            ? (int) Carbon::parse($firstExperience)->diffInMonths(now()) + 1
            : 0;

        return Inertia::render('Home', [
            ...$this->sharedData(),
            'projects' => $this->projects()->where('featured', true)->take(6),
            'projectCount' => Project::query()->count(),
            'experienceDuration' => sprintf('%dy %dm', intdiv($experienceMonths, 12), $experienceMonths % 12),
            'experiences' => Experience::query()->orderBy('order')->get(),
        ]);
    }

    public function work(): Response
    {
        return Inertia::render('Portfolio/Work', [
            ...$this->sharedData(),
            'projects' => $this->projects(),
        ]);
    }

    public function project(Project $project): Response
    {
        return Inertia::render('Portfolio/ProjectShow', [
            ...$this->sharedData(),
            'project' => $project,
            'nextProject' => Project::query()
                ->where('order', '>', $project->order)
                ->orderBy('order')
                ->first() ?? Project::query()->orderBy('order')->first(),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('Portfolio/About', [
            ...$this->sharedData(),
            'experiences' => Experience::query()->orderBy('order')->get(),
        ]);
    }

    public function experience(): Response
    {
        return Inertia::render('Portfolio/Experience', [
            ...$this->sharedData(),
            'experiences' => Experience::query()->orderBy('order')->get(),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('Portfolio/Contact', $this->sharedData());
    }

    private function sharedData(): array
    {
        return [
            'profile' => Profile::query()->first(),
            'skills' => Skill::query()->orderBy('order')->get()->groupBy('category'),
            'certificates' => Certificate::query()->orderBy('order')->get(),
        ];
    }

    private function projects()
    {
        return Project::query()->orderByDesc('featured')->orderBy('order')->get();
    }
}
