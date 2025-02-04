<?php
use App\Http\Controllers\BucketlistController;
use App\Http\Controllers\FirebaseUserController;

Route::get('/csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello']);
});

Route::get('/users',[FirebaseUserController::class, 'getAllUsers']);
Route::post('/signup',[FirebaseUserController::class, 'createUser']);
Route::post('/login',[FirebaseUserController::class, 'authenticateUser']);
Route::post('/verify',[FirebaseUserController::class, 'verifyIdToken']);
// バケットリスト取得
Route::get('/bucketlists', [BucketlistController::class, 'index']);

// 新規バケットリスト作成
Route::post('/bucketlist', [BucketlistController::class, 'store']);

// バケットリスト更新
Route::patch('/bucketlist/{id}', [BucketlistController::class, 'update']);

// バケットリスト削除
Route::delete('/bucketlist/{id}', [BucketlistController::class, 'destroy']);
Route::get('/hello', function () {
    return response()->json(['message' => 'Hello']);
});