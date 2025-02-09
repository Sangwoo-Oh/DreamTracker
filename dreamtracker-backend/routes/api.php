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

// バケットリスト取得
Route::get('/bucketlists', [BucketlistController::class, 'index']);
// 新規バケットリスト作成
Route::post('/bucketlist', [BucketlistController::class, 'store'])->middleware(FirebaseAuthMiddleware::class);
// バケットリスト更新
Route::patch('/bucketlist/{id}', [BucketlistController::class, 'update']);
// バケットリスト削除
Route::delete('/bucketlist/{id}', [BucketlistController::class, 'destroy']);