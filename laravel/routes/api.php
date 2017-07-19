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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::resource('/user', "UserController");
Route::put('/user/{id}/changepassword', "UserController@changePassword");
Route::resource('/appointment', "AppointmentController");
Route::resource('/appointmentUser', "AppointmentUserController");
Route::resource('/accommodation', "AccommodationController");
Route::resource('/accommodationUser', "AccommodationUserController");
Route::resource('/login', "LoginController");
