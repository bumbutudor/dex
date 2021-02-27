<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class WordStoreRequest extends FormRequest
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
            'name' => ['nullable', 'max:100'],
            'dictionary_id' => ['required', Rule::exists('dictionaries', 'id')->where(function ($query) {
                $query->where('account_id', Auth::user()->account_id);
            })],
            'predefinition' => ['nullable'],
            'definition' => ['nullable'],
            'synonyms' => ['nullable'],
            'antonyms' => ['nullable'],
            'paronyms' => ['nullable'],
            'other' => ['nullable'],
            'active' => ['required'],
        ];
    }
}


// 'user_id' => ['required', Rule::exists('organizations', 'id')->where(function ($query) {
//     $query->where('account_id', Auth::user()->account_id);
// })],