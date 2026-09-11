<?php

namespace App\Nova;

use Laravel\Nova\Fields\Date;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;
use Laravel\Nova\Http\Requests\NovaRequest;

class Experience extends Resource
{
    public static $model = \App\Models\Experience::class;

    public static $title = 'role';

    public static $search = ['role', 'company'];

    public function fields(NovaRequest $request): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Role')->rules('required', 'max:255'),
            Text::make('Company')->rules('required', 'max:255'),
            Text::make('Location')->nullable(),
            Date::make('Start Date')->rules('required'),
            Date::make('End Date')->nullable()->help('Leave empty to show Present.'),
            Textarea::make('Description')->alwaysShow()->nullable(),
            Number::make('Order')->sortable()->rules('integer'),
        ];
    }
}
