<?php

namespace Tests\Feature;

use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPortfolioTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_login_and_non_admins_are_forbidden(): void
    {
        $this->get('/admin')->assertRedirect('/login');

        $this->actingAs(User::factory()->create())
            ->get('/admin')
            ->assertForbidden();
    }

    public function test_admin_can_open_portfolio_cms(): void
    {
        $this->actingAs(User::factory()->create(['is_admin' => true]))
            ->get('/admin')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Admin/Index'));
    }

    public function test_admin_can_update_profile_and_manage_portfolio_records(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $profile = Profile::query()->create([
            'name' => 'Ibrahim',
            'headline' => 'Developer',
            'availability' => 'Available',
            'years_experience' => 4,
        ]);

        $this->actingAs($admin)->post('/admin/profile', [
            'name' => 'M.Ibrahim Nawab',
            'headline' => 'Full Stack Developer',
            'location' => 'Karachi',
            'summary' => 'Summary',
            'bio' => 'Biography',
            'email' => 'ibrahim@example.com',
            'linkedin_url' => 'https://linkedin.com/in/ibrahim',
            'github_url' => null,
            'availability' => 'Available for projects',
            'years_experience' => 4,
        ])->assertSessionHasNoErrors();
        $this->assertSame('M.Ibrahim Nawab', $profile->fresh()->name);

        $this->actingAs($admin)->post('/admin/projects', [
            'title' => 'Siin Admin',
            'slug' => 'siin-admin',
            'category' => 'Admin',
            'summary' => 'Administration platform.',
            'description' => 'Details',
            'tech_stack' => 'Laravel, Vue 3',
            'featured' => true,
            'order' => 0,
        ])->assertSessionHasNoErrors();
        $project = Project::query()->firstOrFail();
        $this->assertSame(['Laravel', 'Vue 3'], $project->tech_stack);

        $this->actingAs($admin)->post('/admin/experiences', [
            'role' => 'Full Stack Developer',
            'company' => 'Siin',
            'employment_type' => 'Full-time',
            'work_mode' => 'Remote',
            'location' => 'Karachi, Pakistan',
            'description' => 'Product engineering',
            'order' => 0,
        ])->assertSessionHasNoErrors();
        $this->assertDatabaseHas('experiences', [
            'company' => 'Siin',
            'work_mode' => 'Remote',
            'location' => 'Karachi, Pakistan',
        ]);

        $this->actingAs($admin)->post('/admin/skills', [
            'name' => 'Laravel',
            'category' => 'Backend',
            'proficiency' => 95,
            'order' => 0,
        ])->assertSessionHasNoErrors();
        $this->assertDatabaseHas('skills', ['name' => 'Laravel']);

        $this->actingAs($admin)->delete("/admin/projects/{$project->id}")
            ->assertSessionHasNoErrors();
        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }

    public function test_admin_can_reorder_projects_and_experiences(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $firstProject = Project::query()->create([
            'title' => 'First project',
            'slug' => 'first-project',
            'summary' => 'First summary',
            'order' => 0,
        ]);
        $secondProject = Project::query()->create([
            'title' => 'Second project',
            'slug' => 'second-project',
            'summary' => 'Second summary',
            'order' => 1,
        ]);
        $firstExperience = Experience::query()->create([
            'role' => 'First role',
            'company' => 'First company',
            'order' => 0,
        ]);
        $secondExperience = Experience::query()->create([
            'role' => 'Second role',
            'company' => 'Second company',
            'order' => 1,
        ]);

        $this->actingAs($admin)->patch('/admin/projects/reorder', [
            'ids' => [$secondProject->id, $firstProject->id],
        ])->assertSessionHasNoErrors();

        $this->actingAs($admin)->patch('/admin/experiences/reorder', [
            'ids' => [$secondExperience->id, $firstExperience->id],
        ])->assertSessionHasNoErrors();

        $this->assertSame(0, $secondProject->fresh()->order);
        $this->assertSame(1, $firstProject->fresh()->order);
        $this->assertSame(0, $secondExperience->fresh()->order);
        $this->assertSame(1, $firstExperience->fresh()->order);
    }

    public function test_admin_can_manage_certificates(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)->post('/admin/certificates', [
            'title' => 'Advanced Diploma in Software Engineering',
            'issuer' => 'Aptech Pakistan',
            'issue_date' => '2021-07-01',
            'credential_url' => 'https://example.com/credential',
            'description' => 'Three-year software engineering programme.',
            'order' => 0,
        ])->assertSessionHasNoErrors();

        $certificate = Certificate::query()->firstOrFail();
        $this->assertSame('Aptech Pakistan', $certificate->issuer);

        $this->actingAs($admin)->patch("/admin/certificates/{$certificate->id}", [
            'title' => 'Advanced Diploma',
            'issuer' => 'Aptech Pakistan',
            'issue_date' => null,
            'credential_url' => null,
            'description' => 'Updated.',
            'order' => 1,
        ])->assertSessionHasNoErrors();
        $this->assertSame('Advanced Diploma', $certificate->fresh()->title);

        $this->actingAs($admin)->delete("/admin/certificates/{$certificate->id}")
            ->assertSessionHasNoErrors();
        $this->assertDatabaseMissing('certificates', ['id' => $certificate->id]);
    }
}
