<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Http\Requests\NovaRequest;

abstract class Resource extends \Laravel\Nova\Resource
{
    public static $perPageOptions = [25, 50, 100];

    public static function authorizedToCreate(Request $request): bool
    {
        return true;
    }

    public function authorizedToReplicate(Request $request): bool
    {
        return false;
    }

    public function fieldsForIndex(NovaRequest $request): array
    {
        return $this->fields($request);
    }
}
