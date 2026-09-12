<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if ($this->app->environment('production')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        $this->ensureRuntimeStores();

        Vite::prefetch(concurrency: 3);
    }

    /**
     * Login rate-limiting uses the cache store. If the database `cache`
     * table is missing, fall back so POST /login does not 500.
     */
    private function ensureRuntimeStores(): void
    {
        try {
            if (config('cache.default') === 'database' && ! Schema::hasTable('cache')) {
                config(['cache.default' => 'file']);
            }

            if (config('session.driver') === 'database' && ! Schema::hasTable('sessions')) {
                config(['session.driver' => 'file']);
            }
        } catch (\Throwable) {
            config([
                'cache.default' => 'file',
                'session.driver' => config('session.driver') === 'database' ? 'file' : config('session.driver'),
            ]);
        }
    }
}
