<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;

class ResumeService
{
    public function __construct(private PortfolioService $portfolio) {}

    public function document(): string
    {
        $data = $this->portfolio->resume();
        abort_unless($data['profile'], 404);

        $fontDir = storage_path('fonts');
        $tempDir = storage_path('app/dompdf');
        $resumeDir = storage_path('app/resume');

        foreach ([$fontDir, $tempDir, $resumeDir] as $directory) {
            File::ensureDirectoryExists($directory);
        }

        $cached = $resumeDir.'/'.$this->fingerprint($data).'.pdf';
        if (is_file($cached)) {
            $cachedPdf = file_get_contents($cached);
            if (is_string($cachedPdf) && str_starts_with($cachedPdf, '%PDF')) {
                return $cachedPdf;
            }
        }

        $wrapper = Pdf::loadView('pdf.resume', $data)->setPaper('a4');
        // setOption keeps Laravel/DomPDF defaults. setOptions() replaces them and
        // points font cache at vendor/lib/fonts, which is not writable on Railway.
        $wrapper->setOption('isRemoteEnabled', false);
        $wrapper->setOption('isPhpEnabled', false);
        $wrapper->setOption('defaultFont', 'DejaVu Sans');
        $wrapper->setOption('fontDir', $fontDir);
        $wrapper->setOption('fontCache', $fontDir);
        $wrapper->setOption('tempDir', $tempDir);
        $wrapper->setOption('chroot', base_path());
        $wrapper->setOption('pdfBackend', 'CPDF');
        $wrapper->setOption('enableFontSubsetting', true);

        $pdf = $wrapper->output();
        abort_unless(is_string($pdf) && str_starts_with($pdf, '%PDF'), 500, 'Resume could not be generated.');

        file_put_contents($cached, $pdf);

        return $pdf;
    }

    private function fingerprint(array $data): string
    {
        return hash('sha256', json_encode([
            $data['profile'],
            $data['skills']->toArray(),
            $data['experiences']->toArray(),
            $data['projects']->toArray(),
            filemtime(resource_path('views/pdf/resume.blade.php')),
        ], JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE) ?: '');
    }
}
