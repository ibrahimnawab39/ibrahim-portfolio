#!/bin/bash
set -euo pipefail

# Map Railway MySQL plugin vars → Laravel DB_* when missing.
export DB_CONNECTION="${DB_CONNECTION:-mysql}"
export DB_HOST="${DB_HOST:-${MYSQLHOST:-${MYSQL_HOST:-}}}"
export DB_PORT="${DB_PORT:-${MYSQLPORT:-${MYSQL_PORT:-3306}}}"
export DB_DATABASE="${DB_DATABASE:-${MYSQLDATABASE:-${MYSQL_DATABASE:-railway}}}"
export DB_USERNAME="${DB_USERNAME:-${MYSQLUSER:-${MYSQL_USER:-root}}}"
export DB_PASSWORD="${DB_PASSWORD:-${MYSQLPASSWORD:-${MYSQL_PASSWORD:-${MYSQL_ROOT_PASSWORD:-}}}}"
if [ -z "${DB_URL:-}" ] && [ -n "${MYSQL_URL:-}" ]; then
  export DB_URL="$MYSQL_URL"
fi

# Prefer file cache unless explicitly overridden — avoids login 500 when
# database cache table is missing after a partial migrate.
export CACHE_STORE="${CACHE_STORE:-file}"

if [ "${IS_LARAVEL:-}" = "true" ]; then
  echo "DB target: ${DB_CONNECTION}://${DB_USERNAME}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}"

  if [ -z "${DB_HOST}" ] && [ -z "${DB_URL:-}" ]; then
    echo "ERROR: No MySQL host. Set DB_HOST=\${{MySQL.MYSQLHOST}} on the app service."
    exit 1
  fi

  php artisan optimize:clear

  echo "Running migrations ..."
  php artisan migrate --force

  needs_seed="$(php -r '
require "vendor/autoload.php";
$app = require "bootstrap/app.php";
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
echo App\Models\User::query()->exists() ? "0" : "1";
')"

  if [ "$needs_seed" = "1" ]; then
    echo "Empty database — seeding portfolio data ..."
    php artisan db:seed --force
  fi

  php -r '
require "vendor/autoload.php";
$app = require "bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
foreach (["users", "sessions", "cache", "profiles", "projects"] as $table) {
    echo $table.":".(Illuminate\Support\Facades\Schema::hasTable($table) ? "ok" : "MISSING").PHP_EOL;
}
'

  php artisan storage:link --force >/dev/null 2>&1 || true
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
  echo "Starting Laravel server ..."
fi

exec docker-php-entrypoint --config /Caddyfile --adapter caddyfile 2>&1
