<?php

namespace Database\Seeders;

use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $admin = User::query()->firstOrNew(['email' => 'admin@ibrahimnawab.com']);
        if (! $admin->exists) {
            $admin->password = Hash::make(env('ADMIN_PASSWORD', 'Ibrahim@2026'));
        }
        $admin->fill([
            'name' => 'M.Ibrahim Nawab',
            'email_verified_at' => $admin->email_verified_at ?? now(),
            'is_admin' => true,
        ])->save();

        $profile = Profile::query()->first() ?? new Profile;
        $profile->fill([
            'name' => 'M.Ibrahim Nawab',
            'headline' => 'Laravel · PHP · WordPress · MySQL · API · Android · Flutter · Vue.js · Node.js',
            'location' => 'Karachi, Sindh, Pakistan',
            'photo_path' => '/images/ibrahim-nawab.jpeg',
            'summary' => 'Full Stack Developer with 6+ years across Laravel, PHP, WordPress, APIs, Vue.js, Flutter, Android and production web applications.',
            'bio' => 'I am a Full Stack Developer based in Karachi working across backend development, frontend applications, APIs, administration platforms, WordPress commerce and mobile products. My experience includes full-time, part-time and freelance roles with Siin, K-Labs, Freelancer, Fiverr, DotClick, webbulls.us, Digitach, Xiom Software Company and Deevloopers.',
            'email' => 'hello@ibrahimnawab.com',
            'linkedin_url' => 'https://pk.linkedin.com/in/ibrahim-nawab',
            'github_url' => null,
            'availability' => 'Available for selected projects',
            'years_experience' => 6,
        ])->save();

        Skill::query()->delete();
        $skills = [
            ['Laravel', 'Backend Engineering', 95],
            ['PHP', 'Backend Engineering', 94],
            ['MySQL', 'Backend Engineering', 90],
            ['SQL', 'Backend Engineering', 90],
            ['API Development', 'Backend Engineering', 92],
            ['Nova Laravel', 'Backend Engineering', 88],
            ['C#', 'Backend Engineering', 76],
            ['Vue.js', 'Frontend Engineering', 88],
            ['JavaScript Frameworks', 'Frontend Engineering', 88],
            ['Node.js', 'Frontend Engineering', 82],
            ['HTML5', 'Frontend Engineering', 94],
            ['CSS', 'Frontend Engineering', 92],
            ['WordPress', 'CMS & Commerce', 90],
            ['WooCommerce', 'CMS & Commerce', 86],
            ['Elementor', 'CMS & Commerce', 88],
            ['Flutter', 'Mobile Development', 84],
            ['Dart', 'Mobile Development', 82],
            ['Android', 'Mobile Development', 80],
        ];
        foreach ($skills as $order => [$name, $category, $proficiency]) {
            Skill::query()->create(compact('name', 'category', 'proficiency', 'order'));
        }

        Experience::query()->delete();
        $experiences = [
            ['role' => 'Back End Developer', 'company' => 'Siin | سين', 'employment_type' => 'Full-time', 'work_mode' => 'Remote', 'location' => 'Karachi, Sindh, Pakistan', 'start_date' => '2024-12-01', 'end_date' => null, 'description' => 'Backend development for the Siin product ecosystem, including Siin mobile applications, Siin Admin and Seller Hub.'],
            ['role' => 'Full-stack Developer', 'company' => 'K-Labs', 'employment_type' => 'Full-time', 'work_mode' => 'On-site', 'location' => 'Karachi, Sindh, Pakistan', 'start_date' => '2023-07-01', 'end_date' => null, 'description' => 'Laravel, WordPress, Flutter and platform work including Visit Bahrain, Bahrain Basketball Association and King Hamad Global Center for Peaceful Coexistence.'],
            ['role' => 'Full Stack Developer', 'company' => 'Freelancer.com', 'employment_type' => 'Freelance', 'work_mode' => 'Remote', 'location' => 'Pakistan', 'start_date' => '2019-12-01', 'end_date' => null, 'description' => 'Freelance full-stack delivery including Airport Pickups, Expert Community and UK Education Center.'],
            ['role' => 'Full-Stack Developer', 'company' => 'Fiverr', 'employment_type' => 'Freelance', 'work_mode' => 'Remote', 'location' => 'Pakistan', 'start_date' => '2022-02-01', 'end_date' => null, 'description' => 'Freelance web development including Airport Pickups and Clarice, using SQL and JavaScript frameworks.'],
            ['role' => 'Sr Laravel Developer', 'company' => 'DotClick', 'employment_type' => 'Part-time', 'work_mode' => 'Remote', 'location' => 'Karachi Division, Sindh, Pakistan', 'start_date' => '2023-03-01', 'end_date' => '2023-10-31', 'description' => 'Senior Laravel development in a remote part-time role with SQL and JavaScript framework work.'],
            ['role' => 'Full-stack Developer', 'company' => 'webbulls.us', 'employment_type' => 'Full-time', 'work_mode' => 'On-site', 'location' => 'Karachi, Sindh, Pakistan', 'start_date' => '2022-10-01', 'end_date' => '2023-06-30', 'description' => 'Laravel and SQL development across projects including Screen Boogers, SS247 and ReaxRealty.'],
            ['role' => 'Full Stack Developer', 'company' => 'Digitach (Pvt.) Ltd', 'employment_type' => 'Full-time', 'work_mode' => 'On-site', 'location' => 'Karachi, Sindh, Pakistan', 'start_date' => '2022-09-01', 'end_date' => '2022-10-31', 'description' => 'Laravel and WordPress delivery including Logo Prime and the company services website.'],
            ['role' => 'Senior PHP Developer', 'company' => 'Xiom Software Company', 'employment_type' => 'Full-time', 'work_mode' => 'On-site', 'location' => 'Karachi, Sindh, Pakistan', 'start_date' => '2021-07-01', 'end_date' => '2022-09-30', 'description' => 'Senior PHP development across Sirviktor, My STU, Skincardz and other Laravel and C# projects.'],
            ['role' => 'PHP Developer', 'company' => 'Deevloopers', 'employment_type' => 'Full-time', 'work_mode' => 'On-site', 'location' => 'Karachi, Sindh, Pakistan', 'start_date' => '2020-07-01', 'end_date' => '2021-07-31', 'description' => 'PHP and Laravel development for customer projects and the Deevloopers company platform.'],
        ];
        foreach ($experiences as $order => $experience) {
            Experience::query()->create([...$experience, 'order' => $order]);
        }

        Certificate::query()->delete();
        $certificates = [
            ['Advanced Diploma in Software Engineering', 'Aptech Pakistan', null, 'Three-year software engineering program completed from 2018 to 2021.'],
            ['Certificate of Appreciation', 'Xiom Software Company', null, 'Recognition for software development contribution and delivery.'],
            ['Certificate of Appreciation', 'Iqra University (Official)', null, 'Certificate of appreciation for professional contribution.'],
            ['Certificate of Participation', 'Aptech Pakistan', null, 'Participation in professional software and technology activities.'],
        ];
        foreach ($certificates as $order => [$title, $issuer, $issueDate, $description]) {
            Certificate::query()->create([
                'title' => $title,
                'issuer' => $issuer,
                'issue_date' => $issueDate,
                'description' => $description,
                'order' => $order,
            ]);
        }

        Project::query()->delete();
        $projects = [
            ['Xoomtel', 'xoomtel', 'WordPress website', 'webbulls.us', 'A WordPress project delivered in April 2023.', 'WordPress design and website development.', ['WordPress Design', 'WordPress'], true, '2023-04-01', '2023-04-30'],
            ['668 Cafe', '668-cafe', 'Laravel dashboard', 'K-Labs', 'A Laravel and Nova Laravel dashboard for 668 Cafe.', 'Dashboard work associated with K-Labs.', ['Laravel', 'Nova Laravel'], true, null, null],
            ['Airport Pickups', 'airport-pickups', 'WordPress website', 'Freelancer.com', 'A WordPress website for airport pickup services.', 'WordPress design and implementation delivered through Freelancer.com.', ['WordPress Design', 'WordPress'], true, null, null],
            ['BBA Fantasy', 'bba-fantasy', 'Flutter application', 'K-Labs', 'A Flutter project associated with the Bahrain Basketball Association application.', 'Mobile application work delivered with K-Labs.', ['Flutter'], true, null, null],
            ['Baitbaitk', 'baitbaitk', 'WooCommerce website', 'webbulls.us', 'An Elementor-based WooCommerce website.', 'WordPress, Elementor and WooCommerce implementation.', ['WordPress Design', 'WordPress', 'Elementor', 'WooCommerce'], true, null, null],
            ['Baus World', 'baus-world', 'Web application', 'Xiom Software Company', 'A PHP and Handlebars.js web project.', 'Web application work associated with Xiom Software Company.', ['PHP', 'Handlebars.js'], true, null, null],
            ['BestDesiTv', 'best-desi-tv', 'Media website', 'webbulls.us', 'A media-focused website associated with webbulls.us.', 'Public entertainment and media web experience.', ['Web Development'], false, null, null],
            ['Custom CMS', 'custom-cms', 'Laravel CMS', 'webbulls.us', 'Custom CMS and page builder using Laravel.', 'A custom content management system and page builder built with Laravel.', ['Laravel', 'PHP'], false, null, null],
            ['Deevloopers', 'deevloopers', 'Company website', 'Deevloopers', 'The Deevloopers company website.', 'Company platform implemented with CSS, HTML5 and supporting web technologies.', ['CSS', 'HTML5'], false, null, null],
            ['Digitach', 'digitach', 'Company website', 'webbulls.us', 'A company website project associated with webbulls.us.', 'Corporate web design and development.', ['Web Development'], false, null, null],
            ['Expert Community', 'expert-community', 'PHP application', 'Freelancer.com', 'A PHP community application.', 'PHP application work delivered through Freelancer.com.', ['PHP', 'PHP Applications'], false, null, null],
            ['Faz3a Client', 'faz3a-client', 'Flutter application', 'K-Labs', 'The client mobile application for Faz3a.', 'Flutter and Dart application work associated with K-Labs.', ['Flutter', 'Dart'], false, null, null],
            ['Faz3a Vendor', 'faz3a-vendor', 'Flutter application', 'K-Labs', 'The vendor mobile application for Faz3a.', 'Flutter and Dart vendor application work associated with K-Labs.', ['Flutter', 'Dart'], false, null, null],
            ['Faz3a Website and API', 'faz3a-website-api', 'Laravel platform', 'K-Labs', 'The Faz3a website, API and administration platform.', 'Laravel, API and Nova Laravel delivery for the Faz3a ecosystem.', ['Laravel', 'Nova Laravel', 'API'], false, null, null],
            ['FutebolTV', 'futebol-tv', 'Sports media website', 'webbulls.us', 'A football-focused media website.', 'Sports media web experience associated with webbulls.us.', ['Web Development'], false, null, null],
            ['Future Key', 'future-key', 'Company website', 'webbulls.us', 'A custom website for Future Key.', 'Web design and development associated with webbulls.us.', ['Web Development'], false, null, null],
            ['Logo Prime', 'logo-prime', 'Creative website', 'webbulls.us', 'A website for the Logo Prime creative brand.', 'Creative services website associated with webbulls.us.', ['Web Development'], false, null, null],
            ['SS247', 'ss247', 'Web platform', 'webbulls.us', 'A custom web platform associated with webbulls.us.', 'Laravel and web application delivery.', ['Laravel', 'SQL'], false, null, null],
            ['Siin Admin', 'siin-admin', 'Administration platform', 'K-Labs', 'An administration platform for the Siin product ecosystem.', 'Admin tooling implemented with Nova Laravel.', ['Nova Laravel', 'Nova'], false, null, null],
            ['Sirviktor', 'sirviktor', 'Web application', 'Xiom Software Company', 'A web application associated with Xiom Software Company.', 'PHP and Laravel product development.', ['PHP', 'Laravel'], false, null, null],
            ['Skincardz', 'skincardz', 'Web application', 'Xiom Software Company', 'A PHP and C# project associated with Xiom Software Company.', 'Web application development across PHP and C#.', ['PHP', 'C#'], false, null, null],
            ['Visit Bahrain', 'visit-bahrain', 'Flutter application', 'K-Labs', 'The Visit Bahrain mobile application.', 'Flutter application work published on Google Play.', ['Flutter'], false, null, null],
            ['Webbulls', 'webbulls', 'Company website', 'webbulls.us', 'Official company website made with custom WordPress and Elementor.', 'Custom WordPress and Elementor company website.', ['WordPress', 'Elementor'], false, null, null],
            ['BBA Fantasy Dashboard and API', 'bba-fantasy-dashboard-api', 'Laravel platform', 'K-Labs', 'The BBA Fantasy dashboard and API.', 'Laravel and Nova Laravel administration and API work.', ['Laravel', 'Nova Laravel', 'API'], false, null, null],
            ['Caloria', 'caloria', 'Laravel platform', 'K-Labs', 'A Laravel and Nova Laravel product associated with K-Labs.', 'Application and administration platform development.', ['Laravel', 'Nova Laravel'], false, null, null],
            ['Sunni Waqf', 'sunni-waqf', 'Laravel platform', 'K-Labs', 'A Laravel API and dashboard for Sunni Waqf.', 'Laravel, Nova Laravel, API and dashboard delivery.', ['Laravel', 'Nova Laravel', 'API'], false, null, null],
        ];

        foreach ($projects as $order => [$title, $slug, $category, $company, $summary, $description, $techStack, $featured, $startDate, $endDate]) {
            Project::query()->create([
                'title' => $title,
                'slug' => $slug,
                'category' => $category,
                'company' => $company,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'summary' => $summary,
                'description' => $description,
                'tech_stack' => $techStack,
                'featured' => $featured,
                'order' => $order,
            ]);
        }
    }
}
