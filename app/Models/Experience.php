<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'include_in_resume',
        'role',
        'company',
        'logo_path',
        'company_url',
        'employment_type',
        'work_mode',
        'location',
        'start_date',
        'end_date',
        'description',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'include_in_resume' => 'boolean',
            'start_date' => 'date',
            'end_date' => 'date',
            'order' => 'integer',
        ];
    }
}
