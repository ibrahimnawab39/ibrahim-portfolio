<?php

namespace App\Nova;

use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Slug;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;
use Laravel\Nova\Http\Requests\NovaRequest;

class Project extends Resource
{
    public static $model = \App\Models\Project::class;

    public static $title = 'title';

    public static $search = ['title', 'summary', 'category'];

    public function fields(NovaRequest $request): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Title')->rules('required', 'max:255')->sortable(),
            Slug::make('Slug')->from('Title')->rules('required'),
            Text::make('Category')->nullable(),
            Textarea::make('Summary')->alwaysShow()->rules('required'),
            Textarea::make('Description')->alwaysShow()->nullable(),
            Text::make('Tech Stack', 'tech_stack')
                ->resolveUsing(fn ($value) => is_array($value) ? implode(', ', $value) : $value)
                ->fillUsing(function ($request, $model, $attribute) {
                    $model->{$attribute} = array_values(array_filter(array_map(
                        'trim',
                        explode(',', (string) $request->input($attribute))
                    )));
                })
                ->help('Comma-separated, e.g. Laravel, Vue 3, MySQL'),
            Text::make('Live URL', 'live_url')->nullable(),
            Text::make('Repo URL', 'repo_url')->nullable(),
            Boolean::make('Featured'),
            Number::make('Order')->sortable()->rules('integer'),
        ];
    }
}
