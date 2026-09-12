<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Cache;

class ResumeService
{
    public function __construct(private PortfolioService $portfolio) {}

    public function document(): string
    {
        $data = $this->portfolio->resume();
        abort_unless($data['profile'], 404);

        // Hash invalidates when CMS content or the Blade template changes.
        $key = 'resume:'.hash('sha256', json_encode($data).file_get_contents(resource_path('views/pdf/resume.blade.php')));

        // Store as base64 so database/MySQL cache columns stay UTF-8 safe
        // (raw PDF bytes contain binary sequences that break MySQL string columns).
        $encoded = Cache::remember($key, now()->addDay(), function () use ($data) {
            $pdf = Pdf::loadView('pdf.resume', $data)
                ->setPaper('a4')
                ->setOptions([
                    'isRemoteEnabled' => false,
                    'isPhpEnabled' => false,
                    'defaultFont' => 'DejaVu Sans',
                ])
                ->output();

            return base64_encode($pdf);
        });

        $pdf = base64_decode($encoded, true);
        abort_unless(is_string($pdf) && str_starts_with($pdf, '%PDF'), 500, 'Resume could not be generated.');

        return $pdf;
    }
}
