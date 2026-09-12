<?php

namespace App\Services;

use App\Models\Profile;
use App\Models\Project;
use Illuminate\Http\Request;

class SeoService
{
    public function forRequest(Request $request): array
    {
        $profile = Profile::query()->first();
        $project = $request->route('project');
        $route = $request->route()?->getName() ?? '';
        $name = $profile?->name ?? 'Ibrahim Nawab';
        $jobTitle = $profile?->headline ?: 'Laravel & Full Stack Developer';
        $fallbackDescription = $profile?->summary
            ?: 'Laravel, web applications and full stack development by Ibrahim Nawab.';
        $baseUrl = rtrim((string) config('app.url'), '/');
        $path = $request->path() === '/' ? '' : '/'.ltrim($request->path(), '/');
        $canonical = $baseUrl.$path;
        $defaultImage = $this->absoluteUrl('/og.png');
        $sameAs = array_values(array_filter([
            $profile?->linkedin_url,
            $profile?->github_url,
        ]));

        $pages = [
            'home' => [
                'title' => $name.' — '.$jobTitle,
                'description' => $fallbackDescription,
                'type' => 'website',
                'schema' => 'home',
            ],
            'work.index' => [
                'title' => 'Selected Work — '.$name,
                'description' => 'Selected Laravel products, operational platforms and infrastructure projects by '.$name.'.',
                'type' => 'website',
                'schema' => 'collection',
            ],
            'about' => [
                'title' => 'About — '.$name,
                'description' => $fallbackDescription,
                'type' => 'profile',
                'schema' => 'about',
            ],
            'experience' => [
                'title' => 'Experience — '.$name,
                'description' => 'Professional experience, roles and engineering background of '.$name.'.',
                'type' => 'website',
                'schema' => 'experience',
            ],
            'contact' => [
                'title' => 'Start a Project — '.$name,
                'description' => 'Discuss a Laravel product, operational platform or infrastructure project with '.$name.'.',
                'type' => 'website',
                'schema' => 'contact',
            ],
        ];

        $isProject = $project instanceof Project;
        $isPublic = array_key_exists($route, $pages) || ($isProject && $request->routeIs('work.show'));

        if ($isProject) {
            $title = $project->title.' — '.$name;
            $description = $project->summary ?: $fallbackDescription;
            $image = $project->image_path
                ? $this->absoluteUrl($project->image_path)
                : $defaultImage;
            $type = 'article';
            $schema = $this->projectSchema($project, $name, $canonical, $image, $sameAs, $baseUrl, $jobTitle);
        } elseif (isset($pages[$route])) {
            $page = $pages[$route];
            $title = $page['title'];
            $description = $page['description'];
            $image = $defaultImage;
            $type = $page['type'];
            $schema = $this->pageSchema(
                $page['schema'],
                $name,
                $jobTitle,
                $title,
                $description,
                $canonical,
                $baseUrl,
                $sameAs,
                $profile,
            );
        } else {
            $title = 'Account — '.$name;
            $description = $fallbackDescription;
            $image = $defaultImage;
            $type = 'website';
            $schema = null;
        }

        return [
            'title' => $title,
            'description' => $description,
            'canonical' => $canonical,
            'image' => $image,
            'image_alt' => $isProject ? $project->title.' — '.$name : $name.' portfolio',
            'site_name' => $name,
            'locale' => str_replace('_', '-', app()->getLocale()),
            'type' => $type,
            'robots' => $isPublic ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, nofollow',
            'author' => $name,
            'schema' => $isPublic ? $schema : null,
        ];
    }

    private function absoluteUrl(string $path): string
    {
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return rtrim((string) config('app.url'), '/').'/'.ltrim($path, '/');
    }

    private function personEntity(
        string $name,
        string $jobTitle,
        string $baseUrl,
        array $sameAs,
        ?Profile $profile = null,
    ): array {
        $person = [
            '@type' => 'Person',
            '@id' => $baseUrl.'#person',
            'name' => $name,
            'jobTitle' => $jobTitle,
            'url' => $baseUrl,
            'sameAs' => $sameAs,
        ];

        if ($profile?->email) {
            $person['email'] = $profile->email;
        }

        if ($profile?->location) {
            $person['address'] = [
                '@type' => 'PostalAddress',
                'addressLocality' => $profile->location,
            ];
        }

        if ($profile?->photo_path) {
            $person['image'] = $this->absoluteUrl($profile->photo_path);
        }

        return $person;
    }

    private function pageSchema(
        string $kind,
        string $name,
        string $jobTitle,
        string $title,
        string $description,
        string $canonical,
        string $baseUrl,
        array $sameAs,
        ?Profile $profile,
    ): array {
        $person = $this->personEntity($name, $jobTitle, $baseUrl, $sameAs, $profile);

        return match ($kind) {
            'home' => [
                '@context' => 'https://schema.org',
                '@graph' => [
                    [
                        '@type' => 'WebSite',
                        '@id' => $baseUrl.'#website',
                        'url' => $baseUrl,
                        'name' => $name,
                        'description' => $description,
                        'publisher' => ['@id' => $baseUrl.'#person'],
                        'inLanguage' => 'en',
                    ],
                    $person,
                ],
            ],
            'about' => [
                '@context' => 'https://schema.org',
                '@type' => 'ProfilePage',
                '@id' => $canonical.'#page',
                'url' => $canonical,
                'name' => $title,
                'description' => $description,
                'mainEntity' => $person,
            ],
            'collection' => [
                '@context' => 'https://schema.org',
                '@type' => 'CollectionPage',
                '@id' => $canonical.'#page',
                'url' => $canonical,
                'name' => $title,
                'description' => $description,
                'isPartOf' => ['@id' => $baseUrl.'#website'],
                'about' => $person,
            ],
            'experience' => [
                '@context' => 'https://schema.org',
                '@type' => 'ProfilePage',
                '@id' => $canonical.'#page',
                'url' => $canonical,
                'name' => $title,
                'description' => $description,
                'mainEntity' => $person,
            ],
            'contact' => [
                '@context' => 'https://schema.org',
                '@type' => 'ContactPage',
                '@id' => $canonical.'#page',
                'url' => $canonical,
                'name' => $title,
                'description' => $description,
                'about' => $person,
            ],
            default => [
                '@context' => 'https://schema.org',
                '@type' => 'WebPage',
                '@id' => $canonical.'#page',
                'url' => $canonical,
                'name' => $title,
                'description' => $description,
            ],
        };
    }

    private function projectSchema(
        Project $project,
        string $name,
        string $canonical,
        string $image,
        array $sameAs,
        string $baseUrl,
        string $jobTitle,
    ): array {
        $work = [
            '@type' => 'CreativeWork',
            '@id' => $canonical.'#work',
            'name' => $project->title,
            'headline' => $project->title,
            'description' => $project->summary,
            'url' => $canonical,
            'image' => $image,
            'author' => [
                '@type' => 'Person',
                '@id' => $baseUrl.'#person',
                'name' => $name,
                'jobTitle' => $jobTitle,
                'url' => $baseUrl,
                'sameAs' => $sameAs,
            ],
        ];

        if ($project->category) {
            $work['genre'] = $project->category;
        }

        if (is_array($project->tech_stack) && $project->tech_stack !== []) {
            $work['keywords'] = implode(', ', $project->tech_stack);
        }

        if ($project->live_url) {
            $work['sameAs'] = [$project->live_url];
        }

        if ($project->updated_at) {
            $work['dateModified'] = $project->updated_at->toAtomString();
        }

        return [
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => 'BreadcrumbList',
                    'itemListElement' => [
                        [
                            '@type' => 'ListItem',
                            'position' => 1,
                            'name' => 'Home',
                            'item' => $baseUrl,
                        ],
                        [
                            '@type' => 'ListItem',
                            'position' => 2,
                            'name' => 'Selected Work',
                            'item' => $baseUrl.'/work',
                        ],
                        [
                            '@type' => 'ListItem',
                            'position' => 3,
                            'name' => $project->title,
                            'item' => $canonical,
                        ],
                    ],
                ],
                $work,
            ],
        ];
    }
}
