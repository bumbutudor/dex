<?php

namespace App\Http\Controllers;

use App\Http\Requests\DictionaryStoreRequest;
use App\Http\Requests\DictionaryUpdateRequest;
use App\Http\Resources\DictionaryCollection;
use App\Http\Resources\DictionaryResource;
use App\Http\Resources\UserOrganizationCollection;
use App\Models\Dictionary;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class DictionaryController extends Controller
{
    public function index()
    {
        return Inertia::render('Dictionary/Index', [
            'filters' => Request::all('search', 'trashed'),
            'dictionaries' => new DictionaryCollection(
				@Todo query user dictionaries
                Auth::user()->account->organization()
                    ->orderByName()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }
}
