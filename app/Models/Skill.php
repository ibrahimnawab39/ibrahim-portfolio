<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = ['name', 'category', 'proficiency', 'order'];

    protected function casts(): array
    {
        return ['proficiency' => 'integer', 'order' => 'integer'];
    }
}
