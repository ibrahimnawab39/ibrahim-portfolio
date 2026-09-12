#!/bin/bash
set -euo pipefail

# Railpack uses this when present in the project root.
if [ "${IS_LARAVEL:-}" = "true" ]; then
  echo "Running migrations ..."
  php artisan migrate --force

  php artisan storage:link --force >/dev/null 2>&1 || true
  echo "Starting Laravel server ..."
fi

exec docker-php-entrypoint --config /Caddyfile --adapter caddyfile 2>&1
