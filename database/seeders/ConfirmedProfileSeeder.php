<?php
namespace Database\Seeders;
use App\Models\{Profile, Experience, Project};
use Illuminate\Database\Seeder;
class ConfirmedProfileSeeder extends Seeder
{
    public function run(): void {
        Profile::query()->first()?->update([
            'whatsapp_number' => '+923145212938',
            'email' => 'ibrahimnawab2879@gmail.com',
            'linkedin_url' => 'https://www.linkedin.com/in/ibrahim-nawab/',
            'github_url' => 'https://github.com/ibrahimnawab39',
            'resume_headline' => 'Laravel & Full Stack Developer',
            'resume_summary' => 'Laravel and full stack developer building web applications, backend systems, admin panels, REST APIs and database-driven workflows. Currently contributing to both K-Labs and its associated Siin company. Experience across PHP, Laravel, Vue.js, WordPress and mobile products, with a focus on maintainable code and practical delivery.',
            'education_title' => 'Advanced Diploma in Software Engineering',
            'education_institution' => 'Aptech Pakistan', 'education_period' => '2018 - 2021',
        ]);
        Experience::query()->whereIn('company', ['Freelancer.com', 'Fiverr'])->update(['include_in_resume' => false]);
        Project::query()->whereIn('slug', ['custom-cms','bba-fantasy-dashboard-api','siin-admin','baitbaitk'])->update(['include_in_resume' => true]);
    }
}
