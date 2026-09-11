<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class Skill extends Resource
{
    public static $model = \App\Models\Skill::class;

    public static $title = 'name';

    public static $search = ['name', 'category'];

    public function fields(NovaRequest $request): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Name')->rules('required', 'max:255'),
            Text::make('Category')->rules('required', 'max:255'),
            Number::make('Proficiency')->min(0)->max(100)->step(1)->rules('required'),
            Number::make('Order')->sortable()->rules('integer'),
        ];
    }
}
