<?php

namespace App\Nova;

use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;
use Laravel\Nova\Http\Requests\NovaRequest;

class ContactMessage extends Resource
{
    public static $model = \App\Models\ContactMessage::class;

    public static $title = 'email';

    public static $search = ['name', 'email', 'company', 'message'];

    public static function authorizedToCreate(\Illuminate\Http\Request $request): bool
    {
        return false;
    }

    public function fields(NovaRequest $request): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Name')->readonly(),
            Text::make('Email')->readonly(),
            Text::make('Company')->readonly(),
            Text::make('Budget')->readonly(),
            Textarea::make('Message')->alwaysShow()->readonly(),
            DateTime::make('Received', 'created_at')->sortable()->readonly(),
            DateTime::make('Read At')->nullable(),
        ];
    }
}
