<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GeminiController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/gemini', [GeminiController::class, 'test_hello_gemini']);

Route::prefix('api')->group(base_path('routes/api.php'));

