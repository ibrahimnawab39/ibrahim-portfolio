<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;
use Laravel\Nova\Http\Requests\NovaRequest;

class Profile extends Resource
{
    public static $model = \App\Models\Profile::class;

    public static $title = 'name';

    public static $search = ['name', 'headline', 'location'];

    public function fields(NovaRequest $request): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Name')->rules('required', 'max:255'),
            Text::make('Headline')->rules('required', 'max:255'),
            Text::make('Location')->nullable(),
            Textarea::make('Summary')->alwaysShow()->rules('required'),
            Textarea::make('Bio')->alwaysShow()->nullable(),
            Text::make('Availability')->nullable(),
            Number::make('Years Experience')->min(0)->max(60),
            Text::make('Email')->nullable(),
            Text::make('LinkedIn URL', 'linkedin_url')->nullable(),
            Text::make('GitHub URL', 'github_url')->nullable(),
        ];
    }
}
