# Ibrahim Nawab — Portfolio

Laravel 12, Vue 3 and Inertia portfolio with a database-backed administration panel.

## Current baseline

The main branch contains the existing portfolio: home, work, project details, about, experience and contact pages. Authenticated administrators manage profile details, projects, skills, experience, certificates and contact messages at `/admin`.

The visual redesign is being developed separately on `feat/portfolio-spatial-redesign`.

## Local setup

Requirements: PHP 8.2+, Composer, Node.js 22 and SQLite or a Laravel-supported database.

```bash
composer install
npm ci
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
npm run build
php artisan serve
```

Configure your database in `.env`. The existing database seeder contains sample portfolio content and resets portfolio records: use it only on an empty development database. Review the admin credentials in the seeder before use; change them before exposing the application publicly. Never commit `.env`, database files or uploaded private content.

## Development and validation

```bash
composer dev
php artisan test
npm run build
```

## Structure

- `app/Models`: Eloquent portfolio and user models.
- `app/Http/Controllers`: public pages, authentication and CMS actions.
- `resources/js/Pages`: Vue pages, including the administration panel.
- `resources/js/Layouts`: public and authenticated layouts.
- `database/migrations`: database schema changes.
- `tests/Feature`: authentication and CMS feature coverage.

## Planned redesign

- Charcoal, ivory and copper visual system, responsive layouts and interactive 3D structure.
- Laravel services, manageable custom sections and reusable Vue components.
- Resume PDF generated from the same managed profile and experience data.

README will be updated as features are implemented and verified. The planned redesign and automatic PDF generation are not part of this baseline release.
