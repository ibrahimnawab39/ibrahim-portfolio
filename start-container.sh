#!/bin/bash
set -euo pipefail

# Railpack calls this instead of the default PHP start script when present.
if [ "${IS_LARAVEL:-}" = "true" ]; then
  if [ "${RAILPACK_SKIP_MIGRATIONS:-}" != "true" ]; then
    echo "Running migrations ..."
    php artisan migrate --force
  fi

  php artisan storage:link --force >/dev/null 2>&1 || true
  echo "Starting Laravel server ..."
fi

# FrankenPHP / Caddy (Railpack image entrypoint)
exec docker-php-entrypoint --config /Caddyfile --adapter caddyfile 2>&1
