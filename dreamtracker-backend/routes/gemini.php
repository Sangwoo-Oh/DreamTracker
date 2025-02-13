<?php
use App\Http\Controllers\GeminiController;
use App\Http\Middleware\FirebaseAuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(FirebaseAuthMiddleware::class)->group(function () {
    Route::post('/suggested', [GeminiController::class, 'getSuggestedItems']);
});