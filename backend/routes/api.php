<?php

use App\Http\Resources\Album;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return new UserResource($request->user());
})->middleware('auth:sanctum');


Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers'], function () {
    Route::apiResource('albums', 'AlbumController');
    Route::post('users/{user}/albums', 'UserController@createAlbum');
    Route::get('users/{user}/albums', 'UserController@albums');
    Route::post('albums/{album}/photos', 'AlbumController@addPhoto');
    Route::post('login', 'ApiAuthController@login')->middleware('guest');
});
