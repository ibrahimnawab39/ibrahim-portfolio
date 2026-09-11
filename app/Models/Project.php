<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
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

    protected function casts(): array
    {
        return [
            'tech_stack' => 'array',
            'featured' => 'boolean',
            'order' => 'integer',
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }
}
