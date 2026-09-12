#!/bin/bash
# Optional pre-deploy: migrate + seed empty DB + cache.
set -euo pipefail

php artisan storage:link --force || true
php artisan migrate --force

needs_seed="$(php -r '
require "vendor/autoload.php";
$app = require "bootstrap/app.php";
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
echo App\Models\User::query()->exists() ? "0" : "1";
')"

if [ "$needs_seed" = "1" ]; then
  echo "Empty database detected — seeding ..."
  php artisan db:seed --force
fi

php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache || true
