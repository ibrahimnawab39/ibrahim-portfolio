<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
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
