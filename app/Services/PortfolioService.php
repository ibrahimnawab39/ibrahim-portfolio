<?php

namespace App\Services;

use App\Models\{Certificate, Experience, Profile, Project, Section, Skill};
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class PortfolioService
{
    public function shared(): array
    {
        $profile = Profile::query()->first();
        return [
            'profile' => $profile ? [...$profile->toArray(), 'resume_available' => true] : null,
            'skills' => Skill::query()->orderBy('order')->get()->groupBy('category'),
            'certificates' => Certificate::query()->orderBy('order')->get(),
            'sections' => Section::query()->where('published', true)->orderBy('order')->get(),
        ];
    }

    public function projects(): Builder
    {
        return Project::query()->orderByDesc('featured')->orderBy('order')->orderBy('id');
    }

    public function experienceDuration(): string
    {
        $start = Experience::query()->whereDate('start_date', '<=', today())->min('start_date');
        $months = $start ? max(0, (int) Carbon::parse($start)->diffInMonths(now())) : 0;
        return sprintf('%dy %dm', intdiv($months, 12), $months % 12);
    }

    public function resume(): array
    {
        return [
            ...$this->shared(),
            'experiences' => Experience::query()->where('include_in_resume', true)->orderBy('order')->get(),
            'projects' => $this->projects()->where('include_in_resume', true)->get(),
        ];
    }
}
