<?php

namespace Tests\Feature;

use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResumeTest extends TestCase
{
    use RefreshDatabase;

    public function test_resume_is_not_found_without_a_profile(): void
    {
        $this->get('/resume')->assertNotFound();
    }

    public function test_resume_downloads_as_pdf(): void
    {
        Profile::query()->create([
            'name' => 'M.Ibrahim Nawab',
            'headline' => 'Full Stack Developer',
            'resume_headline' => 'Laravel & Full Stack Developer',
            'location' => 'Karachi, Pakistan',
            'summary' => 'Builds Laravel platforms.',
            'email' => 'hello@ibrahimnawab.com',
            'linkedin_url' => 'https://www.linkedin.com/in/ibrahim-nawab',
            'availability' => 'Available',
            'years_experience' => 6,
        ]);

        Skill::query()->create([
            'name' => 'Laravel',
            'category' => 'Backend Engineering',
            'proficiency' => 95,
            'order' => 0,
        ]);

        Experience::query()->create([
            'role' => 'Full-stack Developer',
            'company' => 'K-Labs',
            'employment_type' => 'Full-time',
            'work_mode' => 'Remote',
            'location' => 'Karachi',
            'start_date' => '2023-07-01',
            'description' => 'Laravel platform work.',
            'include_in_resume' => true,
            'order' => 0,
        ]);

        Project::query()->create([
            'title' => 'Siin Hub',
            'slug' => 'siin-hub',
            'category' => 'Product',
            'summary' => 'Seller operations hub.',
            'tech_stack' => ['Laravel', 'Vue'],
            'include_in_resume' => true,
            'featured' => true,
            'order' => 0,
        ]);

        $this->get('/resume')
            ->assertOk()
            ->assertHeader('content-type', 'application/pdf');
    }
}
