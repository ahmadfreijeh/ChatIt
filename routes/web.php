<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::group(['middleware' => 'auth'], function () {

    Route::get('/home', 'HomeController@index')->name('home');

    Route::group(['prefix' => 'chat'], function () {
        Route::get('/history', 'ChatController@history')->name('chat.history');
        Route::delete('/history/delete', 'ChatController@delete')->name('chat.history.delete');
        Route::get('/single/conversation/{id}/{token}', 'ChatController@open')->name('chat.open');
        Route::post('/send', 'ChatController@send')->name('chat.send');
    });

});