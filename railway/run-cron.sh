#!/bin/bash
# Scheduler loop for Railway.
set -euo pipefail
while true; do
  php artisan schedule:run --verbose --no-interaction
  sleep 60
done
