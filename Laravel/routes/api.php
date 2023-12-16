<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurvayController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function () {
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::get("/me", [AuthController::class, "me"]);
  Route::apiResource("/survay", SurvayController::class);
  Route::get("/dashboard", [DashboardController::class, "index"]);
});
Route::post("/signup", [AuthController::class, "signup"]);
Route::post("/login", [AuthController::class, "login"]);
Route::get("/survay/get-by-slug/{survay:slug}", [SurvayController::class, "getBySlug"]);
Route::post("/survay/{survay}/answer", [SurvayController::class, "storeAnswer"]);
