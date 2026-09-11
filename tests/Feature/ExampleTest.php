<?php

namespace Tests\Feature;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_a_contact_message_can_be_submitted(): void
    {
        $response = $this->post('/contact', [
            'name' => 'Jane Client',
            'email' => 'jane@example.com',
            'company' => 'Example Co',
            'budget' => '$5k — $15k',
            'message' => 'We need a Laravel operations platform.',
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('contact_messages', [
            'email' => 'jane@example.com',
        ]);
    }

    public function test_public_portfolio_pages_are_available(): void
    {
        $project = Project::query()->create([
            'title' => 'Operations Platform',
            'slug' => 'operations-platform',
            'category' => 'Product engineering',
            'summary' => 'A dependable operations platform.',
            'description' => 'Built for real operational teams.',
            'tech_stack' => ['Laravel', 'Vue 3'],
            'featured' => true,
        ]);

        $this->get('/work')->assertOk();
        $this->get("/work/{$project->slug}")->assertOk();
        $this->get('/about')->assertOk();
        $this->get('/experience')->assertOk();
        $this->get('/contact')->assertOk();
    }
}
