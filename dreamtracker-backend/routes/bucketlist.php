<?php
use App\Http\Middleware\FirebaseAuthMiddleware;
use App\Http\Controllers\BucketlistController;
use Illuminate\Support\Facades\Route;

Route::middleware(FirebaseAuthMiddleware::class)->group(function () {
    Route::get('/', [BucketlistController::class, 'index']);
    Route::post('/', [BucketlistController::class, 'store']);
    Route::patch('/{id}', [BucketlistController::class, 'update']);
    Route::delete('/{id}', [BucketlistController::class, 'destroy']);
});