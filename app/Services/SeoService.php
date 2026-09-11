<?php
namespace App\Services;
use App\Models\{Profile, Project};
use Illuminate\Http\Request;
class SeoService
{
    public function forRequest(Request $request): array
    {
        $profile = Profile::query()->first();
        $project = $request->route('project');
        $name = $profile?->name ?? 'Ibrahim Nawab';
        $titles = ['home' => 'Laravel & Full Stack Developer', 'work.index' => 'Selected Projects', 'about' => 'About', 'experience' => 'Professional Experience', 'contact' => 'Contact'];
        $public = array_key_exists($request->route()?->getName() ?? '', $titles) || $request->routeIs('work.show');
        $title = $project instanceof Project ? $project->title : ($titles[$request->route()?->getName()] ?? 'Account');
        $description = $project instanceof Project ? $project->summary : ($profile?->summary ?? 'Laravel, web applications and full stack development by Ibrahim Nawab.');
        $canonical = rtrim(config('app.url'), '/').'/'.ltrim($request->path() === '/' ? '' : $request->path(), '/');
        return [
            'title' => $title.' - '.$name, 'description' => $description,
            'canonical' => $canonical, 'image' => rtrim(config('app.url'), '/').'/og-portfolio.png',
            'robots' => $public ? 'index, follow' : 'noindex, nofollow',
            'schema' => $public ? [
                '@context' => 'https://schema.org', '@type' => 'ProfilePage', '@id' => $canonical.'#page',
                'url' => $canonical, 'name' => $title.' - '.$name,
                'mainEntity' => ['@type' => 'Person', 'name' => $name, 'jobTitle' => 'Laravel & Full Stack Developer',
                    'url' => rtrim(config('app.url'), '/'), 'sameAs' => array_values(array_filter([$profile?->linkedin_url, $profile?->github_url]))],
            ] : null,
        ];
    }
}
