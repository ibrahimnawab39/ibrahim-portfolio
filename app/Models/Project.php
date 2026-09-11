<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'include_in_resume',
        'title',
        'slug',
        'category',
        'company',
        'image_path',
        'start_date',
        'end_date',
        'summary',
        'description',
        'tech_stack',
        'live_url',
        'repo_url',
        'featured',
        'order',
    ];

    protected $appends = ['gallery', 'is_mobile'];

    protected function casts(): array
    {
        return [
            'tech_stack' => 'array',
            'featured' => 'boolean',
            'include_in_resume' => 'boolean',
            'order' => 'integer',
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function getIsMobileAttribute(): bool
    {
        return (bool) preg_match('/flutter|mobile/i', (string) $this->category);
    }

    public function getGalleryAttribute(): array
    {
        $directory = public_path('images/projects/'.$this->slug);
        if (is_dir($directory)) {
            $shots = collect(glob($directory.'/screen-*.png') ?: [])
                ->sort()
                ->map(fn (string $path) => '/images/projects/'.$this->slug.'/'.basename($path))
                ->values()
                ->all();

            if ($shots !== []) {
                return $shots;
            }
        }

        return $this->image_path ? [$this->image_path] : [];
    }
}
