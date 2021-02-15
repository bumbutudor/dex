<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class DictionaryStoreRequest extends FormRequest
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
            'organization_id' => ['nullable', Rule::exists('organizations', 'id')->where(function ($query) {
                $query->where('account_id', Auth::user()->account_id);
            })],
            'description' => ['nullable', 'max:325'],
        ];
    }
}
