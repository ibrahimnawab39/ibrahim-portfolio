<?php
namespace App\Http\Controllers;
use App\Models\Project;
class SitemapController extends Controller
{
    public function __invoke() {
        $base = rtrim(config('app.url'), '/');
        $paths = ['', '/work', '/about', '/experience', '/contact'];
        $urls = collect($paths)->map(fn ($path) => ['url' => $base.$path, 'updated' => null]);
        foreach (Project::query()->select(['slug','updated_at'])->cursor() as $project) {
            $urls->push(['url' => $base.'/work/'.$project->slug, 'updated' => $project->updated_at?->toAtomString()]);
        }
        return response()->view('sitemap', compact('urls'))->header('Content-Type','application/xml');
    }
}
