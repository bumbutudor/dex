<?php

namespace App\Http\Controllers;

use App\Http\Requests\WordStoreRequest;
use App\Http\Requests\WordUpdateRequest;
use App\Http\Resources\WordCollection;
use App\Http\Resources\WordResource;
// use App\Http\Resources\UserWordCollection;
use App\Http\Resources\WordDictionaryCollection;
use App\Models\Word;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class WordsController extends Controller
{
    public function index()
    {
        return Inertia::render('Words/Index', [
            'filters' => Request::all('search', 'trashed'),
            'words' => new WordCollection(
                Auth::user()->words()
                    ->with('dictionary')
                    ->orderByName()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Words/Create', [
            'dictionaries' => new WordDictionaryCollection(
                Auth::user()->account->dictionaries()
                    ->orderBy('name')
                    ->get()
            ),
        ]);
    }

    public function store(WordStoreRequest $request)
    {
        Auth::user()->words()->create(
            $request->validated()
        );

        return Redirect::route('words')->with('success', 'Cuvântul a fost adăugat.');
    }

    // @TODO update and rest

}
