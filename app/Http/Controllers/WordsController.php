<?php

namespace App\Http\Controllers;

use App\Http\Requests\WordStoreRequest;
use App\Http\Requests\WordUpdateRequest;
use App\Http\Resources\WordCollection;
use App\Http\Resources\WordResource;
// use App\Http\Resources\UserWordCollection;
use App\Http\Resources\WordDictionaryCollection;
use App\Models\Word;
// use App\Models\Account;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;


function generateRandomNumberEachDay(){
    $seed = date("d"); //get the day.
    srand($seed); //seeds the random generator with it.
    $item = rand(1,10000);
    return $item;
}


class WordsController extends Controller
{
    public function index()
    {
        return Inertia::render('Words/Index', [
            'filters' => Request::all('search', 'trashed'),
            'words' => new WordCollection(
                // Auth::user()->words() modified by Tudor on 27 - remove Auth
                Word::with('dictionary')
                    ->orderByName()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    // for @guest
    public function view()
    {
        return Inertia::render('Words/View', [
            'filters' => Request::all('search', 'trashed'),
            'words' => new WordCollection(
                Word::with('dictionary')
                    ->orderByName()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
            'wordOfTheDay' => Word::with('dictionary')
                    ->firstWhere('ID', generateRandomNumberEachDay()),
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
    public function edit(Word $word)
    {
        return Inertia::render('Words/Edit', [
            'word' => new WordResource($word),
            'dictionaries' => new WordDictionaryCollection(
                Auth::user()->account->dictionaries()
                    ->orderBy('name')
                    ->get()
            ),
        ]);
    }

    public function update(Word $word, WordUpdateRequest $request)
    {
        $word->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Datele au fost modificate.');
    }

    public function destroy(Word $word)
    {
        $word->delete();

        return Redirect::back()->with('success', 'Cuvântul a fost șters.');
    }

    public function restore(Word $word)
    {
        $word->restore();

        return Redirect::back()->with('success', 'Cuvântul a fost restabilit.');
    }

}
