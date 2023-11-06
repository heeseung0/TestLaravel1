<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware(['login'])->group(function() {
    Route::get('/', function () {
        //return view('main');
        return view('welcome');
    });

    Route::get('/baseinfo/user', function(){
        return view('/baseinfo/user');
    });

    Route::get('/baseinfo/commoncode', function(){
        return view('/baseinfo/commoncode');
    });

    Route::get('/viewtest1', function(){
        return view('/test/viewtest1');
    });
    Route::get('/viewtest2', function(){
        return view('/test/viewtest2');
    });
    Route::get('/viewtest3', function(){
        return view('/test/viewtest3');
    });
    Route::get('/viewtest4', function(){
        return view('/test/viewtest4');
    });
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/baseinfo/user/getUser', [App\Http\Controllers\BaseInfoController::class, 'getUser']);
Route::post('/baseinfo/user/saveUser', [App\Http\Controllers\BaseInfoController::class, 'saveUser']);
Route::get('/baseinfo/common/gets', [App\Http\Controllers\BaseInfoController::class, 'getCommon']);
Route::post('/baseinfo/common/save', [App\Http\Controllers\BaseInfoController::class, 'saveCommon']);

