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
        setlocale(LC_COLLATE, 'ro_RO.utf8');

        // get the words of the selected dictionary - added on 30 June 2022 by Tudor
        if (Request::has('dictionar')) {
            return Inertia::render('Words/Index', [
                'filters' => Request::all('search', 'trashed', 'dictionary_id'),
                'words' => new WordCollection(
                    Word::with('dictionary')
                        ->where('dictionary_id', Request::get('dictionar'))
                        ->where('predefinition', 'LIKE', Request::get('litera') . '%')
                        // ->appends(Request::all())
                        ->orderBy('predefinition', 'asc', SORT_LOCALE_STRING)
                        ->filter(Request::only('search', 'trashed'))
                        ->paginate(50)
                        ->appends(Request::all())
                ),
                'dictionaries' => new WordDictionaryCollection(
                    Auth::user()->account->dictionaries()->get()
                ),
                'dictionary_count' => Word::where('dictionary_id','=',Request::get('dictionar'))->count(),
                'dictionary_id' => Request::get('dictionar'),
            ]);
        }

         // get the words of the selected dictionary - added on 30 June 2022 by Tudor
         if (Request::has('all')) {
            return Inertia::render('Words/Index', [
                'filters' => Request::all('search', 'trashed'),
                'words' => new WordCollection(
                    Word::with('dictionary')
                        ->where('predefinition', 'LIKE', Request::get('litera') . '%')
                        // ->appends(Request::all())
                        ->orderBy('predefinition', 'ASC')
                        ->filter(Request::only('search', 'trashed'))
                        ->paginate(50)
                        ->appends(Request::all())
                ),
                'dictionaries' => new WordDictionaryCollection(
                    Auth::user()->account->dictionaries()->get()
                ),
                'dict_uzual_count' => Word::where('dictionary_id','=','1')->count(),
                'dict_sinonime_count' => Word::where('dictionary_id','=','2')->count(),
                'dict_sensuri_noi_count' => Word::where('dictionary_id','=','4')->count(),

            ]);
        }

        $custom_order = "CASE WHEN name REGEXP '^(\"a|a se|A|A SE\")[[:space:]]' = 1 THEN TRIM(SUBSTR(name, INSTR(name, ' '))) ELSE name END ASC";
        return Inertia::render('Words/Index', [
            'filters' => Request::all('search', 'trashed'),
            'words' => new WordCollection(
                // Auth::user()->words() modified by Tudor on 27 - remove Auth
                Word::with('dictionary')
                    // order the words by name without „A”, „A SE”
                    // ->orderByName()
                    // ->where('dictionary_id', Request::get('dictionary_id'))
                    ->orderBy('predefinition', 'ASC')
                    // ->orderByRaw($custom_order)
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate(50)
                    ->appends(Request::all())
            ),
            'dict_uzual_count' => Word::where('dictionary_id','=','1')->count(),
            'dict_sinonime_count' => Word::where('dictionary_id','=','2')->count(),
            'dict_sensuri_noi_count' => Word::where('dictionary_id','=','4')->count(),
            'dictionaries' => new WordDictionaryCollection(
                Auth::user()->account->dictionaries()->get()
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
                    // ->orderByName()
                    ->orderBy('predefinition', 'ASC')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
            'wordOfTheDay' => Word::with('dictionary')
                    ->firstWhere('ID', generateRandomNumberEachDay()),
            'dict_uzual_count' => Word::where('dictionary_id','=','1')->count(),
            'dict_sinonime_count' => Word::where('dictionary_id','=','2')->count(),
            'dict_sensuri_noi_count' => Word::where('dictionary_id','=','4')->count(),
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

    public function storeFromModal(WordStoreRequest $request)
    {
        Auth::user()->words()->create(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Cuvântul a fost adăugat. Dacă mai este vreun intrus, adaugă un cuvânt');
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
        return Redirect::back()->with('success', 'Cuvântul a fost modificat.');
        // return Redirect::refresh()->with('success', 'Cuvântul a fost modificat.');
        
        // return Redirect::route('words')->with('success', 'Cuvântul a fost modificat.');
        // return Redirect::to($request->request->get('http_referrer'))->with('success', 'Cuvântul a fost modificat.');
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

    public function destroy_permanently(Word $word)
    {
        $word->forceDelete();

        return Redirect::back()->with('success', 'Cuvântul a fost șters permanent.');
    }

    public function correct()
    {
        $regex_1 = '/^<p>( *<span> *<b>| *<b> *<span>) *(.){1,80} *<\/b> *(<span>){0,1} *(<i>){1}/i';
	    $regex_2 = '/^<p>( *<span> *<b>| *<b> *<span>) *(.){1,80} *<\/b>/i';
	    $error_words = Word::where('dictionary_id', '=', '1')
						->where('name', 'A SE')
                        // ->where('name', 'A')
						->where('definition', 'regexp', '^<p>( *<span> *<b>| *<b> *<span>) *.+ *</b>.* *<i>')
						// ->limit(10)
						->get();
        $i = 0; 
        
        echo("<h1>Cuvinte cu erori: ".count($error_words));

        foreach ($error_words as $error_word) {
            preg_match($regex_1, $error_word->definition, $matches);
            if (isset($matches[0])) {
                $word_part = $matches[0];
                $word_part = strip_tags($word_part); // remove <b> and <i> tags
                $word_part = preg_replace('/^ ?SE/', ' SE ', $word_part, 1); // replace SEWORD with SE WORD
                $word_part = preg_replace('/~/', ' ~', $word_part, 1); // replace ~ with space~
                $word_part = preg_replace('/\s+/', ' ', $word_part); // replace multiple spaces with one
                $word_part = preg_replace('/1\./', '', $word_part, 1); // remove 1dot
                
                $new_word = $error_word->name . ' ' . $word_part;
                $new_definition = preg_replace($regex_1, '<p><i>', $error_word->definition, 1);
                
                echo("<br>".$new_word."<br>");
                echo($new_definition);

                Word::where('id', $error_word->id)
                    ->update(['name' => $new_word, 'definition' => $new_definition, 'updated_at' => date('Y-m-d H:i:s')]);
                
            $i++;
            }
        
        }
        
        echo("<br><h1>Au fost modificate: ".$i." cuvinte</h1>");

        echo("<a href=".url('')."><-Inapoi</a>");
    }

}
