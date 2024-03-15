<?php

use App\Http\Resources\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers'], function () {
    Route::apiResource('albums', 'AlbumController');
    Route::post('users/{user}/albums', 'UserController@createAlbum');
    Route::get('users/{user}/albums', 'UserController@albums');
});
