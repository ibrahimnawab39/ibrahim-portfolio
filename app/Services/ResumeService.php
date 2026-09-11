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
        // Data and template hashing invalidates the cache on every relevant CMS edit.
        $key = 'resume:'.hash('sha256', json_encode($data).file_get_contents(resource_path('views/pdf/resume.blade.php')));
        return Cache::remember($key, now()->addDay(), fn () => Pdf::loadView('pdf.resume', $data)
            ->setPaper('a4')->setOptions(['isRemoteEnabled' => false, 'isPhpEnabled' => false, 'defaultFont' => 'DejaVu Sans'])->output());
    }
}
