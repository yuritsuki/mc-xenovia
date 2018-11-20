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



Route::group(['prefix' => 'public'], function() {
    Route::get('/users','UserController@accounts');
    Route::post('/reset-pass/{id}','UserController@resetPass');
    Route::post('/check-reset-code','UserController@checkResetCode');
    Route::post('/send-reset-code/{id}','UserController@sendResetCode');
});

Route::group(['middleware' => ['auth:api']], function () {

    Route::get('/user', 'UserController@authenticated');

    Route::group(['middleware' => ['isEditor']], function () {


        Route::get('/users', 'UserController@items');
        Route::get('/user/{id}', 'UserController@item');
        Route::post('/user-save', 'UserController@save');
        Route::delete('/user-delete/{id}', 'UserController@delete');
        Route::post('/user-photo-save', 'UserController@savePhoto');

        Route::get('/users-all', 'UserController@all');

    });

    Route::group(['middleware' => ['isViewer']], function () {
        Route::get('/dashboard', 'MainController@dashboard');
    });
    
    Route::get('/main/data', 'MainController@data');


});
