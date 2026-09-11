<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\Project;
use Illuminate\Database\Seeder;

class PortfolioAssetsSeeder extends Seeder
{
    public function run(): void
    {
        $companies = [
            'Siin | سين' => ['company_url' => 'https://hub.siin.shop/', 'logo_path' => '/images/companies/siin.png'],
            'K-Labs' => ['company_url' => 'https://klabs.co', 'logo_path' => '/images/companies/k-labs.svg'],
            'Freelancer.com' => ['company_url' => 'https://www.freelancer.com', 'logo_path' => '/images/companies/freelancer.svg'],
            'Fiverr' => ['company_url' => 'https://www.fiverr.com', 'logo_path' => '/images/companies/fiverr.svg'],
            'DotClick' => ['company_url' => null, 'logo_path' => '/images/companies/dotclick.svg'],
            'webbulls.us' => ['company_url' => 'https://www.webbulls.us', 'logo_path' => '/images/companies/webbulls.svg'],
            'Digitach (Pvt.) Ltd' => ['company_url' => null, 'logo_path' => '/images/companies/digitach.svg'],
            'Xiom Software Company' => ['company_url' => null, 'logo_path' => '/images/companies/xiom.svg'],
            'Deevloopers' => ['company_url' => 'https://deevloopers.com', 'logo_path' => '/images/companies/deevloopers.svg'],
        ];

        foreach ($companies as $company => $data) {
            Experience::query()->where('company', $company)->update($data);
        }

        $projects = [
            'baitbaitk' => [
                'live_url' => 'https://baitbaitk.store/',
                'image_path' => '/images/projects/baitbaitk.png',
                'summary' => 'WooCommerce storefront for premium homeware and hosting gifts, with bilingual shopping and WhatsApp-assisted checkout.',
                'featured' => true,
                'order' => 0,
            ],
            'siin' => [
                'live_url' => 'https://play.google.com/store/apps/details?id=com.siinshop.app&hl=en',
                'image_path' => '/images/projects/siin-app.png',
                'summary' => 'Siin (سين) live shopping app on Google Play — buy and sell with live commerce experiences.',
                'description' => 'Siin is a live shopping marketplace app published by Siin eCommerce Company. Portfolio work covered backend development across the Siin product ecosystem including mobile applications, admin and seller hub.',
                'featured' => true,
                'order' => 1,
            ],
            'siin-hub' => [
                'live_url' => 'https://hub.siin.shop/',
                'image_path' => '/images/projects/siin-hub.png',
                'summary' => 'Siin seller / operations hub — live shopping commerce platform for the Siin marketplace ecosystem.',
                'description' => 'hub.siin.shop is the Siin web hub for the live shopping marketplace. Work spanned backend and product engineering across Siin mobile apps, Siin Admin and Seller Hub.',
                'featured' => true,
                'order' => 2,
            ],
            'faz3a-website-api' => [
                'live_url' => 'https://faz3a.io/',
                'image_path' => '/images/projects/faz3a.png',
                'summary' => 'Laravel website, API and admin platform connecting Bahraini users to home and roadside service providers.',
                'featured' => true,
                'order' => 3,
            ],
            'faz3a-client' => [
                'live_url' => 'https://play.google.com/store/apps/details?id=com.faz3a.client&hl=en',
                'image_path' => '/images/projects/faz3a-client.png',
                'summary' => 'Faz3a client app on Google Play — home and roadside services in Bahrain, real-time provider matching and live job tracking.',
                'description' => 'Faz3a (فزعة) connects Bahraini users with qualified home and roadside service professionals. The client Flutter app covers service requests, live progress tracking and location-aware matching. Published on Google Play; delivered with K-Labs alongside the Faz3a website, API and vendor ecosystem.',
                'featured' => true,
                'order' => 4,
            ],
            'faz3a-vendor' => [
                'live_url' => 'https://faz3a.io/',
                'image_path' => '/images/projects/faz3a.png',
            ],
            'baity' => [
                'live_url' => 'https://play.google.com/store/apps/details?id=com.eskanbank.baity&hl=en',
                'image_path' => '/images/projects/baity.png',
                'summary' => 'Eskan Bank’s digital property advisor for Bahrain — contributed selected product and engineering support on the mobile experience through K-Labs.',
                'description' => 'Baity (بيتي) is Eskan Bank’s digital property advisor with 10,000+ listings, Baity 360 virtual tours, financing tools and project discovery. Delivered with K-Labs for Eskan Bank; involvement covered selected mobile and product engineering contributions rather than full ownership of the app.',
                'featured' => true,
                'order' => 5,
            ],
            'visit-bahrain' => [
                'live_url' => 'https://play.google.com/store/apps/details?id=com.btea.tg&hl=en',
                'image_path' => '/images/projects/visit-bahrain.png',
                'summary' => 'Flutter travel companion for Bahrain — attractions, trip planning and local discovery, published on Google Play.',
                'featured' => true,
                'order' => 6,
            ],
            'deevloopers' => [
                'live_url' => 'https://deevloopers.com/',
                'image_path' => '/images/projects/deevloopers.png',
                'summary' => 'Company platform for Deevloopers — services, presence and delivery storytelling for a Karachi software studio.',
                'featured' => true,
                'order' => 7,
            ],
            'webbulls' => [
                'live_url' => 'https://www.webbulls.us/',
                'image_path' => '/images/projects/webbulls.png',
                'summary' => 'Custom WordPress and Elementor company website for webbulls.us.',
                'featured' => true,
                'order' => 8,
            ],
            'bba-fantasy' => [
                'live_url' => 'https://play.google.com/store/apps/details?id=com.bba.app&hl=en',
                'image_path' => '/images/projects/bba-fantasy.png',
                'summary' => 'Mobile experience for Bahrain Basketball Association — schedules, results, rankings and team updates, delivered with K-Labs.',
                'featured' => true,
                'order' => 9,
            ],
            'airport-pickups' => [
                'live_url' => 'https://airportpickups.ca/',
                'image_path' => '/images/projects/airport-pickups.png',
                'summary' => 'WordPress site for Toronto Pearson Airport taxi and limo bookings — flat-rate calculator, fleet pages and GTA service coverage.',
                'description' => 'Airport Pickups is a live WordPress experience for Pearson Airport (YYZ) taxi and limousine transfers across the GTA. Work covered WordPress design and implementation for booking-oriented pages, service areas, fleet presentation and conversion-focused content for flat-rate airport pickups and drop-offs.',
                'featured' => true,
                'order' => 10,
            ],
            'prenco' => [
                'live_url' => 'https://prencopk.com/',
                'image_path' => '/images/projects/prenco.png',
                'summary' => 'Corporate website for Pristine Engineering Corporation — structural engineering, architecture and consultancy presence for Karachi and Pakistan.',
                'description' => 'PRENCO (Pristine Engineering Corporation) is a structural engineering and architectural consultancy site covering residential, commercial and industrial services. Delivered as a public company platform with services, projects storytelling, contact and enquiry-focused structure for clients across Karachi and Pakistan.',
                'featured' => true,
                'order' => 11,
            ],
            '668-cafe' => ['featured' => true, 'order' => 12],
        ];

        $featuredSlugs = collect($projects)
            ->filter(fn (array $data) => ($data['featured'] ?? false) === true)
            ->keys()
            ->all();

        Project::query()->whereNotIn('slug', $featuredSlugs)->update(['featured' => false]);

        $createDefaults = [
            'prenco' => [
                'title' => 'PRENCO',
                'category' => 'Company website',
                'company' => 'Pristine Engineering Corporation',
                'tech_stack' => ['WordPress', 'Web Development', 'HTML5', 'CSS'],
            ],
            'siin' => [
                'title' => 'Siin',
                'category' => 'Flutter application',
                'company' => 'Siin | سين',
                'tech_stack' => ['Flutter', 'Laravel', 'API', 'Mobile'],
            ],
            'siin-hub' => [
                'title' => 'Siin Hub',
                'category' => 'Web platform',
                'company' => 'Siin | سين',
                'tech_stack' => ['Laravel', 'API', 'Vue.js', 'Mobile'],
            ],
        ];

        foreach ($projects as $slug => $data) {
            if (isset($data['image_path'])) {
                $absolute = public_path(ltrim($data['image_path'], '/'));
                if (! is_file($absolute)) {
                    unset($data['image_path']);
                }
            }

            $project = Project::query()->firstOrNew(['slug' => $slug]);

            if (! $project->exists) {
                if (! isset($createDefaults[$slug])) {
                    continue;
                }
                $project->fill($createDefaults[$slug]);
            }

            $project->fill($data)->save();
        }
    }
}
