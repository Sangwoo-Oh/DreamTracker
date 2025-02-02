<?php
use App\Http\Controllers\BucketlistController;
Route::get('/hello', function () {
    return response()->json(['message' => 'Hello']);
});


// // Route::middleware('auth:api')->group(function () {
// //     // バケットリスト取得
// //     Route::get('/bucketlists', [BucketlistController::class, 'index']);

// //     // 新規バケットリスト作成
// //     Route::post('/bucketlist', [BucketlistController::class, 'store']);

// //     // バケットリスト更新
// //     Route::patch('/bucketlist/{id}', [BucketlistController::class, 'update']);

// //     // バケットリスト削除
// //     Route::delete('/bucketlist/{id}', [BucketlistController::class, 'destroy']);
// // });
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