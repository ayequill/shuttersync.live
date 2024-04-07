<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/home', function (Request $request) {
    if (!Auth::check()) {
        return response()->json([
            'error' => 'Unauthorized'
        ], 401);
    }
    return response()->json(['user' => $request->user()]);
})->middleware('auth:sanctum');

require __DIR__.'/auth.php';
