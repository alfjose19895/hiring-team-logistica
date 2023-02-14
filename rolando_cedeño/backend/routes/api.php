<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExitController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login',[App\Http\Controllers\Auth\LoginController::class, 'login']);
Route::post('/logout',[App\Http\Controllers\Auth\LogoutController::class, 'logout']);
Route::apiResource('productos', ProductoController::class)->middleware('auth:sanctum');
Route::post('/buscar-productos',[ProductoController::class, 'buscarProducto']);
Route::apiResource('categorias', CategoryController::class)->middleware('auth:sanctum');
Route::get('/categories-cmb',[CategoryController::class, 'searchCategories'])->middleware('auth:sanctum');
Route::apiResource('products', ProductController::class)->middleware('auth:sanctum');
Route::get('/product-search-cmb',[ProductController::class, 'searchProductCmb']);
Route::post('/product-search',[ProductController::class, 'searchProduct'])->middleware('auth:sanctum');
Route::post('/product-search-stock',[ProductController::class, 'searchProductStock'])->middleware('auth:sanctum');
Route::post('/product-search-hist',[ProductController::class, 'searchProductHistory'])->middleware('auth:sanctum');
Route::get('/get-product/{prod}',[ProductController::class, 'getProduct'])->middleware('auth:sanctum');
Route::get('/detail-history/{id}',[ProductController::class, 'detailsHistory'])->middleware('auth:sanctum');
Route::post('/save-income',[IncomeController::class, 'saveIncome'])->middleware('auth:sanctum');
Route::get('/incomes',[IncomeController::class, 'getIncomes'])->middleware('auth:sanctum');
Route::get('/details-income/{id}',[IncomeController::class, 'detailsIncome'])->middleware('auth:sanctum');
Route::post('/save-exit',[ExitController::class, 'saveExit'])->middleware('auth:sanctum');
Route::get('/exits',[ExitController::class, 'getExits'])->middleware('auth:sanctum');
Route::get('/details-exit/{id}',[ExitController::class, 'detailsExit'])->middleware('auth:sanctum');


