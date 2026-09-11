<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Section extends Model
{
    protected $fillable = ['eyebrow', 'title', 'body', 'link_label', 'link_url', 'published', 'order'];
    protected function casts(): array { return ['published' => 'boolean', 'order' => 'integer']; }
}
