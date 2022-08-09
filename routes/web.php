<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

// Home
// Route::get('home')->name('home')->uses('WordsController@home')->middleware('auth');

// Auth
Route::get('login')->name('login')->uses('Auth\LoginController@showLoginForm')->middleware('guest');
Route::post('login')->name('login.attempt')->uses('Auth\LoginController@login')->middleware('guest');
Route::post('logout')->name('logout')->uses('Auth\LoginController@logout');

// Dashboard
// Route::get('/')->name('dashboard')->uses('DashboardController')->middleware('auth');

// Users
Route::get('users')->name('users')->uses('UsersController@index')->middleware('remember', 'auth');
Route::get('users/add')->name('users.create')->uses('UsersController@create')->middleware('auth');
Route::post('users')->name('users.store')->uses('UsersController@store')->middleware('auth');
Route::get('users/{user}/edit')->name('users.edit')->uses('UsersController@edit')->middleware('auth');
Route::put('users/{user}')->name('users.update')->uses('UsersController@update')->middleware('auth');
Route::delete('users/{user}')->name('users.destroy')->uses('UsersController@destroy')->middleware('auth');
Route::put('users/{user}/rest')->name('users.restore')->uses('UsersController@restore')->middleware('auth');

// Images
Route::get('/img/{path}', 'ImagesController@show')->where('path', '.*');

// Dictionaries
Route::get('dictionare')->name('dictionaries')->uses('DictionariesController@index')->middleware('remember', 'auth');
Route::get('litera')->name('litera')->uses('DictionariesController@letter')->middleware('remember', 'auth');
Route::post('litera')->name('dictionaries.sendLetter')->uses('DictionariesController@sendLetter')->middleware('remember', 'auth');
Route::get('dictionar/add')->name('dictionaries.create')->uses('DictionariesController@create')->middleware('auth');
Route::post('dictionar')->name('dictionaries.store')->uses('DictionariesController@store')->middleware('auth');
Route::get('dictionar/{dictionary}/edit')->name('dictionaries.edit')->uses('DictionariesController@edit')->middleware('auth');
Route::get('dictionar/{dictionary}/view')->name('dictionaries.view')->uses('DictionariesController@view')->middleware('guest');
// Route::get('dict/{dictionary}/view')->name('dictionaries.view')->uses('DictionariesController@view')->middleware('guest');
Route::put('dictionar/{dictionary}')->name('dictionaries.update')->uses('DictionariesController@update')->middleware('auth');
Route::delete('dictionar/{dictionary}')->name('dictionaries.destroy')->uses('DictionariesController@destroy')->middleware('auth');
Route::put('dictionar/{dictionary}/rest')->name('dictionaries.restore')->uses('DictionariesController@restore')->middleware('auth');
Route::get('dictionar/{dictionary}/incarca-litera')->name('dictionaries.inser')->uses('DictionariesController@insert')->middleware('auth');

// Words
Route::get('/')->name('words.view')->uses('WordsController@view')->middleware('remember', 'guest'); // should be 'guest'
Route::get('cuvinte')->name('words')->uses('WordsController@index')->middleware('remember', 'auth');
Route::get('cuvint/add')->name('words.create')->uses('WordsController@create')->middleware('auth');
Route::post('cuvinte')->name('words.store')->uses('WordsController@store')->middleware('auth');
Route::get('cuvint/{word}/edit')->name('words.edit')->uses('WordsController@edit')->middleware('auth');
Route::put('cuvint/{word}')->name('words.update')->uses('WordsController@update')->middleware('auth');
Route::delete('cuvint/{word}')->name('words.destroy')->uses('WordsController@destroy')->middleware('auth');
Route::put('cuvint/{word}/rest')->name('words.restore')->uses('WordsController@restore')->middleware('auth');
Route::get('correct')->name('words.correct')->uses('WordsController@correct')->middleware('auth');
Route::post('wordsFromModal')->name('words.storeFromModal')->uses('WordsController@storeFromModal')->middleware('auth');

// Organizations
Route::get('org')->name('organizations')->uses('OrganizationsController@index')->middleware('remember', 'auth');
Route::get('org/add')->name('organizations.create')->uses('OrganizationsController@create')->middleware('auth');
Route::post('org')->name('organizations.store')->uses('OrganizationsController@store')->middleware('auth');
Route::get('org/{organization}/edit')->name('organizations.edit')->uses('OrganizationsController@edit')->middleware('auth');
Route::put('org/{organization}')->name('organizations.update')->uses('OrganizationsController@update')->middleware('auth');
Route::delete('org/{organization}')->name('organizations.destroy')->uses('OrganizationsController@destroy')->middleware('auth');
Route::put('org/{organization}/rest')->name('organizations.restore')->uses('OrganizationsController@restore')->middleware('auth');

// Contacts
Route::get('contacts')->name('contacts')->uses('ContactsController@index')->middleware('remember', 'auth');
Route::get('contacts/create')->name('contacts.create')->uses('ContactsController@create')->middleware('auth');
Route::post('contacts')->name('contacts.store')->uses('ContactsController@store')->middleware('auth');
Route::get('contacts/{contact}/edit')->name('contacts.edit')->uses('ContactsController@edit')->middleware('auth');
Route::put('contacts/{contact}')->name('contacts.update')->uses('ContactsController@update')->middleware('auth');
Route::delete('contacts/{contact}')->name('contacts.destroy')->uses('ContactsController@destroy')->middleware('auth');
Route::put('contacts/{contact}/restore')->name('contacts.restore')->uses('ContactsController@restore')->middleware('auth');


// Insert synonyms into DB
Route::get('/insert-dictionary', function(){
	// $storage_path_synonyms = 'sinonime/synonyms_to_S_no_L.json';
	// $storage_path_explicativ = 'explicativ/explicativ_ac.json';
	// $storage_path = 'dictionar3/sensuri_noi_az.json';
	
	// $storage_path = 'explicativ/explicativ_I2.json';
	// $storage_path = 'explicativ/explicativ_I2part3.json';
	// $storage_path = 'explicativ/explicativ_J.json';
	// $storage_path = 'explicativ/explicativ_S2.json';
	// $storage_path = 'explicativ/explicativ_U.json';
	// $storage_path = 'explicativ/explicativ_V.json';
	// $storage_path = 'explicativ/explicativ_T.json';
	// $storage_path = 'explicativ/explicativ_WXYZ.json';
	// $storage_path = 'explicativ_new/explicativ_new_H.json';
	// $storage_path = 'explicativ_new/explicativ_new_M1.json';
	// $storage_path = 'explicativ_new/explicativ_new_I.json';
	// $storage_path = 'explicativ_new/explicativ_new_E1.json';
	// $storage_path = 'explicativ_new/explicativ_new_D24.json';
	// $storage_path = 'explicativ_new/explicativ_new_M79.json';
	// $storage_path = 'explicativ_new/explicativ_new_M79r.json'; // r = reparat
	$storage_path = 'explicativ_new/explicativ_new_I2.json'; // I2 is Î
 	
	$json = file_get_contents(storage_path($storage_path));
	$objs = json_decode($json,true);
	$i = 0;
	foreach ($objs as $obj)  {
		foreach ($obj as $key => $value) {
			$insertArr[str_slug($key,'_')] = $value;
		} 
		DB::table('words')->insert($insertArr);
		$i++;
	}
	echo 'Litera M79 reparat a fost încărcata in dictionarul <em>Dicționar Explicativ al Limbii Române Actuale</em>. <br>Au fost adăugate '.$i.' cuvinte.';
	// return Redirect::back()->with('success', 'Litera X a fost încărcată. '.$i.' cuvinte au fost adăugate.');
});


// Corect the word-titles
// Route::get('/correct', function(){
// 	$regex_1 = '/^<p>( *<span> *<b>| *<b> *<span>) *(.){1,80} *<\/b> *(<span>){0,1} *(<i>){1}/i';
// 	$regex_2 = '/^<p>( *<span> *<b>| *<b> *<span>) *(.){1,80} *<\/b>/i';
// 	$error_words = DB::table('words')
// 						->where('dictionary_id', '=', '1')
// 						// ->where('name', 'A SE')
// 						->where('definition', 'regexp', '^<p>( *<span> *<b>| *<b> *<span>) *.+ *</b>.* *<i>')
// 						// ->limit(10)
// 						->get();
// 	$i = 0; 
// 	foreach ($error_words as $error_word) {
// 		preg_match($regex_2, $error_word->definition, $matches);
// 		if (isset($matches[0])) {
// 			$word_part = $matches[0];
// 			$word_part = strip_tags($word_part); // remove <b> and <i> tags
// 			$word_part = preg_replace('/^ ?SE/', ' SE ', $word_part, 1); // replace SEWORD with SE WORD
// 			$word_part = preg_replace('/~/', ' ~', $word_part, 1); // replace ~ with space~
// 			$word_part = preg_replace('/\s+/', ' ', $word_part); // replace multiple spaces with one
// 			$word_part = preg_replace('/1\./', '', $word_part, 1); // remove 1dot
// 			$new_word = $error_word->name . ' ' . $word_part;
// 			$new_definition = preg_replace($regex_2, '<p><i>', $error_word->definition, 1);
			
// 			DB::table('words')
// 				->where('id', $error_word->id)
// 				->update(['name' => $new_word, 'definition' => $new_definition, 'updated_at' => date('Y-m-d H:i:s')]);
			
// 				echo($error_word->id." ");
// 			echo($new_word);		
// 		$i++;
// 		}
	
// 	}
// 	echo("<br><h1>Au fost modificate: ".$i." cuvinte</h1>");	
// 	dd($error_words);
	
// });

// Reports
Route::get('reports')->name('reports')->uses('ReportsController')->middleware('auth');

// 500 error
Route::get('500', function () {
    echo $fail;
});

// Modals
Route::get('modals')->name('modals')->uses('ModalController@index')->middleware('auth');
Route::post('organizationsFromModal')->name('organizations.storeFromModal')->uses('OrganizationsController@storeFromModal')->middleware('auth');