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
    Route::get('/baseinfo/company', function(){
        return view('/baseinfo/company');
    });
    Route::get('/baseinfo/bom', function(){
        return view('/baseinfo/bom');
    });
    Route::get('/baseinfo/errorcode', function(){
        return view('/baseinfo/errorcode');
    });

    Route::get('/orderManage/order', function(){
        return view('/orderManage/order');
    });

    //이하 테스트 코드
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
    //이상 테스트 코드
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/baseinfo/user/getUser', [App\Http\Controllers\BaseInfoController::class, 'getUser']);
Route::post('/baseinfo/user/saveUser', [App\Http\Controllers\BaseInfoController::class, 'saveUser']);
Route::get('/baseinfo/common/gets', [App\Http\Controllers\BaseInfoController::class, 'getCommon']);
Route::post('/baseinfo/common/save', [App\Http\Controllers\BaseInfoController::class, 'saveCommon']);
Route::post('/baseinfo/common/del', [App\Http\Controllers\BaseInfoController::class, 'deleteCommon']);
Route::get('/baseinfo/company/gets', [App\Http\Controllers\BaseInfoController::class, 'getCompany']);
Route::post('/baseinfo/company/save', [App\Http\Controllers\BaseInfoController::class, 'saveCompany']);
Route::post('/baseinfo/company/del', [App\Http\Controllers\BaseInfoController::class, 'deleteCompany']);
Route::get('/baseinfo/bom/gets', [App\Http\Controllers\BaseInfoController::class, 'getBOM']);
Route::post('/baseinfo/bom/save', [App\Http\Controllers\BaseInfoController::class, 'saveBOM']);
Route::post('/baseinfo/bom/del', [App\Http\Controllers\BaseInfoController::class, 'deleteBOM']);
Route::get('/baseinfo/error/gets', [App\Http\Controllers\BaseInfoController::class, 'getError']);
Route::post('/baseinfo/error/save', [App\Http\Controllers\BaseInfoController::class, 'saveError']);
Route::post('/baseinfo/error/del', [App\Http\Controllers\BaseInfoController::class, 'deleteError']);

Route::get('/baseinfo/order/gets', [App\Http\Controllers\BaseInfoController::class, 'getOrder']);
Route::post('/baseinfo/order/save', [App\Http\Controllers\BaseInfoController::class, 'saveOrder']);
Route::post('/baseinfo/order/del', [App\Http\Controllers\BaseInfoController::class, 'deleteOrder']);

