<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAlbumRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        if ($this->isMethod('PUT')) {
            return [
                'title' => 'required|string|max:255',
                'description' => 'sometimes|string|max:255',
                'cover' => 'sometimes|string',
                'published' => 'sometimes|boolean',
                'visibility' => 'sometimes|string|in:public,private',
                'password' => 'sometimes|string|max:255',
            ];
        }
        return [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:255',
            'cover' => 'sometimes|string',
            'published' => 'sometimes|boolean',
            'visibility' => 'sometimes|string|in:public,private',
            'password' => 'sometimes|string|max:255',
        ];
    }
}
