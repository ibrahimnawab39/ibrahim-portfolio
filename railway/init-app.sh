#!/bin/bash
# Optional pre-deploy: migrate + seed empty DB + cache.
set -euo pipefail

export DB_CONNECTION="${DB_CONNECTION:-mysql}"
export DB_HOST="${DB_HOST:-${MYSQLHOST:-${MYSQL_HOST:-}}}"
export DB_PORT="${DB_PORT:-${MYSQLPORT:-${MYSQL_PORT:-3306}}}"
export DB_DATABASE="${DB_DATABASE:-${MYSQLDATABASE:-${MYSQL_DATABASE:-railway}}}"
export DB_USERNAME="${DB_USERNAME:-${MYSQLUSER:-${MYSQL_USER:-root}}}"
export DB_PASSWORD="${DB_PASSWORD:-${MYSQLPASSWORD:-${MYSQL_PASSWORD:-${MYSQL_ROOT_PASSWORD:-}}}}"
if [ -z "${DB_URL:-}" ] && [ -n "${MYSQL_URL:-}" ]; then
  export DB_URL="$MYSQL_URL"
fi

echo "Pre-deploy DB: ${DB_CONNECTION}://${DB_USERNAME}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}"

php artisan optimize:clear
mkdir -p storage/fonts storage/app/dompdf storage/app/resume storage/logs storage/framework/{cache,sessions,views} bootstrap/cache
chmod -R ug+rwx storage bootstrap/cache || true
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

php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache || true
