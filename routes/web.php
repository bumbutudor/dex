<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

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
Route::get('/')->name('dictionaries')->uses('DictionariesController@index')->middleware('remember', 'auth');
Route::get('dict/add')->name('dictionaries.create')->uses('DictionariesController@create')->middleware('auth');
Route::post('dict')->name('dictionaries.store')->uses('DictionariesController@store')->middleware('auth');
Route::get('dict/{dictionary}/edit')->name('dictionaries.edit')->uses('DictionariesController@edit')->middleware('auth');
Route::put('dict/{dictionary}')->name('dictionaries.update')->uses('DictionariesController@update')->middleware('auth');
Route::delete('dict/{dictionary}')->name('dictionaries.destroy')->uses('DictionariesController@destroy')->middleware('auth');
Route::put('dict/{dictionary}/rest')->name('dictionaries.restore')->uses('DictionariesController@restore')->middleware('auth');

// Words
Route::get('cuv')->name('words')->uses('WordsController@index')->middleware('remember', 'auth');
Route::get('cuv/add')->name('words.create')->uses('WordsController@create')->middleware('auth');
Route::post('cuv')->name('words.store')->uses('WordsController@store')->middleware('auth');
Route::get('cuv/{word}/edit')->name('words.edit')->uses('WordsController@edit')->middleware('auth');
Route::put('cuv/{word}')->name('words.update')->uses('WordsController@update')->middleware('auth');
Route::delete('cuv/{word}')->name('words.destroy')->uses('WordsController@destroy')->middleware('auth');
Route::put('cuv/{word}/rest')->name('words.restore')->uses('WordsController@restore')->middleware('auth');

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

// Reports
Route::get('reports')->name('reports')->uses('ReportsController')->middleware('auth');

// 500 error
Route::get('500', function () {
    echo $fail;
});
