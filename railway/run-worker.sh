#!/bin/bash
# Queue worker for Railway.
set -euo pipefail
php artisan queue:work --sleep=3 --tries=3 --max-time=3600
