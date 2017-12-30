<?php

use Illuminate\Http\Request;
//use App\stv_content;

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

// Route::get('stv_contents', 'stv_contentsController@index');
 
// Route::get('stv_contents/{stv_content}', 'stv_contentsController@show');
 
// Route::post('stv_contents','stv_contentsController@store');
 
// Route::put('stv_contents/{stv_content}','stv_contentsController@update');
 
// Route::delete('stv_contents/{stv_content}', 'stv_contentsController@delete');

Route::post('login','UsersController@login');