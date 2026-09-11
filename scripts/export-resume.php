<?php
require __DIR__.'/../vendor/autoload.php';
$app = require __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$path = $argv[1] ?? base_path('output/pdf/Ibrahim-Nawab-Resume.pdf');
if (!is_dir(dirname($path))) mkdir(dirname($path), 0755, true);
file_put_contents($path, app(App\Services\ResumeService::class)->document());
echo "Resume exported.\n";
