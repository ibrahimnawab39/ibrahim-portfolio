<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $base = rtrim((string) config('app.url'), '/');
        $now = now()->toAtomString();

        $urls = collect([
            ['url' => $base.'/', 'updated' => $now, 'changefreq' => 'weekly', 'priority' => '1.0'],
            ['url' => $base.'/work', 'updated' => $now, 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['url' => $base.'/about', 'updated' => $now, 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['url' => $base.'/experience', 'updated' => $now, 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['url' => $base.'/contact', 'updated' => $now, 'changefreq' => 'monthly', 'priority' => '0.7'],
        ]);

        foreach (Project::query()->select(['slug', 'updated_at'])->orderByDesc('updated_at')->cursor() as $project) {
            $urls->push([
                'url' => $base.'/work/'.$project->slug,
                'updated' => $project->updated_at?->toAtomString() ?? $now,
                'changefreq' => 'monthly',
                'priority' => '0.6',
            ]);
        }

        $entries = $urls->map(function (array $item): string {
            $xml = '  <url>'."\n";
            $xml .= '    <loc>'.e($item['url']).'</loc>'."\n";
            $xml .= '    <lastmod>'.e($item['updated']).'</lastmod>'."\n";
            $xml .= '    <changefreq>'.e($item['changefreq']).'</changefreq>'."\n";
            $xml .= '    <priority>'.e($item['priority']).'</priority>'."\n";
            $xml .= '  </url>';

            return $xml;
        })->implode("\n");

        $body = '<?xml version="1.0" encoding="UTF-8"?>'."\n"
            .'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n"
            .$entries."\n"
            .'</urlset>'."\n";

        return response($body, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
        ]);
    }
}
