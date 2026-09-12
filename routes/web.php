<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/robots.txt', \App\Http\Controllers\RobotsController::class)->name('robots');
Route::get('/sitemap.xml', \App\Http\Controllers\SitemapController::class)->name('sitemap');
Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/resume', \App\Http\Controllers\ResumeController::class)->middleware('throttle:20,1')->name('resume');
Route::get('/work', [PortfolioController::class, 'work'])->name('work.index');
Route::get('/work/{project:slug}', [PortfolioController::class, 'project'])->name('work.show');
Route::get('/about', [PortfolioController::class, 'about'])->name('about');
Route::get('/experience', [PortfolioController::class, 'experience'])->name('experience');
Route::get('/contact', [PortfolioController::class, 'contact'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('contact.store');

Route::get('/dashboard', function () {
    return request()->user()->is_admin
        ? redirect()->route('admin.index')
        : Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::post('/sections', [\App\Http\Controllers\SectionController::class, 'store']);
    Route::patch('/sections/{section}', [\App\Http\Controllers\SectionController::class, 'update']);
    Route::delete('/sections/{section}', [\App\Http\Controllers\SectionController::class, 'destroy']);
    Route::get('/', [AdminController::class, 'index'])->name('index');
    Route::post('/profile', [AdminController::class, 'updateProfile'])->name('profile.update');
    Route::post('/projects', [AdminController::class, 'storeProject'])->name('projects.store');
    Route::patch('/projects/reorder', [AdminController::class, 'reorderProjects'])->name('projects.reorder');
    Route::post('/projects/{project}', [AdminController::class, 'updateProject'])->name('projects.update');
    Route::delete('/projects/{project}', [AdminController::class, 'destroyProject'])->name('projects.destroy');
    Route::post('/experiences', [AdminController::class, 'storeExperience'])->name('experiences.store');
    Route::patch('/experiences/reorder', [AdminController::class, 'reorderExperiences'])->name('experiences.reorder');
    Route::patch('/experiences/{experience}', [AdminController::class, 'updateExperience'])->name('experiences.update');
    Route::delete('/experiences/{experience}', [AdminController::class, 'destroyExperience'])->name('experiences.destroy');
    Route::post('/certificates', [AdminController::class, 'storeCertificate'])->name('certificates.store');
    Route::patch('/certificates/{certificate}', [AdminController::class, 'updateCertificate'])->name('certificates.update');
    Route::delete('/certificates/{certificate}', [AdminController::class, 'destroyCertificate'])->name('certificates.destroy');
    Route::post('/skills', [AdminController::class, 'storeSkill'])->name('skills.store');
    Route::patch('/skills/{skill}', [AdminController::class, 'updateSkill'])->name('skills.update');
    Route::delete('/skills/{skill}', [AdminController::class, 'destroySkill'])->name('skills.destroy');
    Route::patch('/messages/{message}/read', [AdminController::class, 'markMessageRead'])->name('messages.read');
    Route::delete('/messages/{message}', [AdminController::class, 'destroyMessage'])->name('messages.destroy');
});

require __DIR__.'/auth.php';
