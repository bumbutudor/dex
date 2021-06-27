<?php

namespace App\Http\Controllers;

use App\Http\Requests\DictionaryStoreRequest;
use App\Http\Requests\DictionaryUpdateRequest;
use App\Http\Resources\DictionaryCollection;
use App\Http\Resources\DictionaryWordCollection;
use App\Http\Resources\DictionaryResource;
use App\Http\Resources\UserOrganizationCollection;
use App\Models\Dictionary;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class DictionariesController extends Controller
{
    public function index()
    {
        return Inertia::render('Dictionaries/Index', [
            'filters' => Request::all('search', 'trashed'),
            'dictionaries' => new DictionaryCollection(
				// @Todo query user dictionaries
                Auth::user()->account->dictionaries()
                    // ->with('organization')
                    ->orderByName()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }


    public function create()
    {
        return Inertia::render('Dictionaries/Create', [
            'organizations' => new UserOrganizationCollection(
                Auth::user()->account->organizations()
                    ->orderBy('name')
                    ->get()
            ),
        ]);
    }

    public function store(DictionaryStoreRequest $request)
    {
        Auth::user()->account->dictionaries()->create(
            $request->validated()
        );

        return Redirect::route('dictionaries')->with('success', 'Dicționarul a fost creat.');
    }

    public function edit(Dictionary $dictionary)
    {
        return Inertia::render('Dictionaries/Edit', [
            'organizations' => new UserOrganizationCollection(
                Auth::user()->account->organizations()
                    ->orderBy('name')
                    ->get()
            ),
            'dictionary' => new DictionaryResource($dictionary),
            'dictionary_words' => new DictionaryWordCollection(
				// @Todo query user dictionaries
                    $dictionary->words()
                    ->orderByName()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }


    public function view(Dictionary $dictionary)
    {
        return Inertia::render('Dictionaries/View', [
            // 'organizations' => new UserOrganizationCollection(
            //     Auth::user()->account->organizations()
            //         ->orderBy('name')
            //         ->get()
            // ),
            'dictionary' => new DictionaryResource($dictionary),
            'dictionary_words' => new DictionaryWordCollection(
				// @Todo query user dictionaries
                    $dictionary->words()
                    ->orderByName()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function update(Dictionary $dictionary, DictionaryUpdateRequest $request)
    {
        $dictionary->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Dicționarul a fost modificat.');
    }

    public function destroy(Dictionary $dictionary)
    {
        $dictionary->delete();

        return Redirect::back()->with('success', 'Dicționarul a fost șters.');
    }

    public function restore(Dictionary $dictionary)
    {
        $dictionary->restore();

        return Redirect::back()->with('success', 'Dicționarul a fost restabilit.');
    }
}
