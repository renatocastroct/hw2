<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home')
    ->with('csrf_token', csrf_token());
});

Route::get('home', function () {
    return view('home')
    ->with('csrf_token', csrf_token());
});
Route::get('production', function () {
    return view('production')
    ->with('csrf_token', csrf_token());
});
Route::get('signup', function () {
    return view('signup')
    ->with('csrf_token', csrf_token());
});
Route::get('statistics', function () {
    return view('statistics')
    ->with('csrf_token', csrf_token());
});

Route::post('user', 'App\Http\Controllers\LoginHomeController@homeUser');

Route::get('department', 'App\Http\Controllers\LoginHomeController@homeDepartment');

Route::get('notlog', 'App\Http\Controllers\LoginHomeController@homeNotLog');

Route::get('managelots/{initCall}/{lot?}/{product?}/{flag?}/', 'App\Http\Controllers\ManageLotsController@manageLots');


Route::get('droplot/{lot}', 'App\Http\Controllers\ManageLotsController@dropLot');
Route::get('createlot/{lot}/{product}/{nWfs}', 'App\Http\Controllers\ManageLotsController@createLot');

Route::get('production/{send}', function ($send) {
    return view('production')
    ->with("send", $send)
    ->with('csrf_token', csrf_token());
});

Route::get('checkusername/{firstName}/{lastName}/{department}', 'App\Http\Controllers\SignupController@checkUsername');
Route::post('checkusername', 'App\Http\Controllers\SignupController@checkUsername');

Route::post('signupvalidation', 'App\Http\Controllers\SignupController@signupValidation');

Route::get('statistics/comparison', 'App\Http\Controllers\StatisticsController@quotes');

Route::get('logout/{send}', 'App\Http\Controllers\LoginHomeController@logout');
