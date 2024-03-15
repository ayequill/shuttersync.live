<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class StoreAlbumRequest extends FormRequest
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
        return [
            'title' => ['required', 'string', 'max:80'],
            'description' => ['sometimes', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
          'title.required' => 'A title is required',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'error' => $validator->errors(),
        ], 401);

        throw new ValidationException($validator, $response);
    }
}
