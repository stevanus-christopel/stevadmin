<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
 
// Route::delete('stv_contents/{stv_content}', 'stv_contentsController@delete');

Route::post('login','UsersController@login');
Route::get('pages', 'ContentsController@pages');

Route::get('contents', 'ContentsController@select');
Route::post('contents', 'ContentsController@insert');
Route::put('contents', 'ContentsController@update');
Route::delete('contents', 'ContentsController@delete');