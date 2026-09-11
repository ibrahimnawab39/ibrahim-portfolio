<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150'],
            'company' => ['nullable', 'string', 'max:150'],
            'budget' => ['nullable', 'string', 'max:80'],
            'message' => ['required', 'string', 'max:3000'],
        ]);

        ContactMessage::query()->create($validated);

        return back()->with('success', 'Thanks — your message is in. I will reply shortly.');
    }
}
