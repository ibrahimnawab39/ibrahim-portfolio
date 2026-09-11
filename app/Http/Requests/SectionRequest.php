<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class SectionRequest extends FormRequest
{
    public function authorize(): bool { return (bool) $this->user()?->is_admin; }
    public function rules(): array {
        return [
            'eyebrow' => ['nullable','string','max:100'], 'title' => ['required','string','max:180'],
            'body' => ['required','string','max:5000'], 'link_label' => ['nullable','string','max:80'],
            'link_url' => ['nullable','url:http,https','max:255'], 'published' => ['required','boolean'],
            'order' => ['required','integer','min:0','max:9999'],
        ];
    }
}
