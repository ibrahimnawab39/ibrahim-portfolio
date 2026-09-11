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
    public function __construct(private \App\Services\PortfolioService $portfolio) {}

    public function home(): Response
    {
        return Inertia::render('Home', [
            ...$this->sharedData(),
            'projects' => $this->portfolio->projects()->where('featured', true)->limit(4)->get(),
            'projectCount' => Project::query()->count(),
            'experienceDuration' => $this->portfolio->experienceDuration(),
            'experiences' => Experience::query()->orderBy('order')->get(),
        ]);
    }

    public function work(): Response
    {
        return Inertia::render('Portfolio/Work', [
            ...$this->sharedData(),
            'projects' => $this->portfolio->projects()->get(),
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
        return $this->portfolio->shared();
    }
}
