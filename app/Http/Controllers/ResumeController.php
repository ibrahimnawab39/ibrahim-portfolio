<?php
namespace App\Http\Controllers;
use App\Services\ResumeService;
use Illuminate\Http\Response;
class ResumeController extends Controller
{
    public function __invoke(ResumeService $resume): Response
    {
        return response($resume->document(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="Ibrahim-Nawab-Resume.pdf"',
            'Cache-Control' => 'no-cache',
            'X-Robots-Tag' => 'noindex',
        ]);
    }
}
