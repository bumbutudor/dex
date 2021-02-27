<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class DictionaryUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'max:100'],
            'description' => ['nullable', 'max:325'],
            // 'organization_id' => ['required', Rule::exists('organizations', 'id')->where(function ($query) {
            //     $query->where('account_id', Auth::user()->organization_id);
            // })],
        ];
    }
}
