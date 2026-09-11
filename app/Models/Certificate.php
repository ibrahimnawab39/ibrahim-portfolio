<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'title',
        'issuer',
        'issue_date',
        'credential_url',
        'description',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'issue_date' => 'date',
            'order' => 'integer',
        ];
    }
}
