<?php

namespace Tests\Feature;

use App\Models\Profile;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SeoTest extends TestCase
{
    use RefreshDatabase;

    public function test_robots_txt_points_to_sitemap_and_blocks_admin(): void
    {
        config(['app.url' => 'https://example.test']);

        $response = $this->get('/robots.txt');

        $response->assertOk();
        $response->assertHeader('Content-Type', 'text/plain; charset=UTF-8');
        $response->assertSee('Sitemap: https://example.test/sitemap.xml', false);
        $response->assertSee('Disallow: /admin', false);
    }

    public function test_sitemap_includes_core_pages_and_projects(): void
    {
        config(['app.url' => 'https://example.test']);

        Project::query()->create([
            'title' => 'Demo Project',
            'slug' => 'demo-project',
            'category' => 'Laravel',
            'summary' => 'A demo summary for SEO.',
            'description' => 'Longer description.',
            'tech_stack' => ['Laravel'],
            'featured' => true,
            'order' => 1,
        ]);

        $response = $this->get('/sitemap.xml');

        $response->assertOk();
        $response->assertHeader('Content-Type', 'application/xml; charset=UTF-8');
        $response->assertSee('https://example.test/', false);
        $response->assertSee('https://example.test/work', false);
        $response->assertSee('https://example.test/work/demo-project', false);
        $response->assertSee('<priority>1.0</priority>', false);
    }

    public function test_home_page_shares_complete_seo_payload(): void
    {
        config(['app.url' => 'https://example.test']);

        Profile::query()->create([
            'name' => 'Ibrahim Nawab',
            'headline' => 'Laravel & Full Stack Developer',
            'summary' => 'Building Laravel products that ship.',
            'email' => 'admin@example.com',
            'linkedin_url' => 'https://linkedin.com/in/example',
            'github_url' => 'https://github.com/example',
        ]);

        $response = $this->get('/');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Home')
            ->where('seo.title', 'Ibrahim Nawab — Laravel & Full Stack Developer')
            ->where('seo.description', 'Building Laravel products that ship.')
            ->where('seo.canonical', 'https://example.test')
            ->where('seo.image', 'https://example.test/og.png')
            ->where('seo.robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
            ->where('seo.type', 'website')
            ->has('seo.schema')
        );
    }

    public function test_project_page_uses_project_image_and_article_type(): void
    {
        config(['app.url' => 'https://example.test']);

        Profile::query()->create([
            'name' => 'Ibrahim Nawab',
            'headline' => 'Laravel & Full Stack Developer',
            'summary' => 'Building Laravel products that ship.',
            'email' => 'admin@example.com',
        ]);

        Project::query()->create([
            'title' => 'Bait Baitk',
            'slug' => 'baitbaitk',
            'category' => 'Flutter',
            'summary' => 'Mobile marketplace summary.',
            'description' => 'Longer description.',
            'image_path' => '/images/projects/baitbaitk.png',
            'tech_stack' => ['Flutter'],
            'featured' => true,
            'order' => 1,
        ]);

        $response = $this->get('/work/baitbaitk');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Portfolio/ProjectShow')
            ->where('seo.title', 'Bait Baitk — Ibrahim Nawab')
            ->where('seo.description', 'Mobile marketplace summary.')
            ->where('seo.image', 'https://example.test/images/projects/baitbaitk.png')
            ->where('seo.type', 'article')
            ->where('seo.canonical', 'https://example.test/work/baitbaitk')
        );
    }
}
