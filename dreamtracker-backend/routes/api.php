<?php
use App\Http\Controllers\BucketlistController;
use App\Http\Controllers\FirebaseUserController;
use App\Http\Middleware\FirebaseAuthMiddleware;

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello']);
});

Route::get('/users',[FirebaseUserController::class, 'getAllUsers']);
Route::post('/signup',[FirebaseUserController::class, 'createUser']);
Route::post('/login',[FirebaseUserController::class, 'authenticateUser']);
Route::post('/verify',[FirebaseUserController::class, 'verifyIdToken']);
Route::post('/logout',[FirebaseUserController::class, 'logoutUser']);

// バケットリスト
Route::prefix('bucketlist')->group(base_path('routes/bucketlist.php'));