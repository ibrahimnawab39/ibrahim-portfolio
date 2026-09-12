<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): RedirectResponse|Response
    {
        if ($request->user()?->is_admin) {
            return redirect()->route('admin.index');
        }

        return Inertia::render('Dashboard');
    }
}
