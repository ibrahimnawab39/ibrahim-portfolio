<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'resume_headline', 'resume_summary', 'education_title', 'education_institution', 'education_period',
        'name',
        'headline',
        'location',
        'photo_path',
        'summary',
        'bio',
        'email',
        'linkedin_url',
        'github_url',
        'availability',
        'years_experience',
    ];
}
