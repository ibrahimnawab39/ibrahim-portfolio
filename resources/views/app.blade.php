<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#11131b">
        <meta name="color-scheme" content="light dark">

        <script>try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')||'dark'}catch(e){document.documentElement.dataset.theme='dark'}</script>
        <title inertia>{{ config('app.name', 'Ibrahim Nawab') }}</title>

        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
