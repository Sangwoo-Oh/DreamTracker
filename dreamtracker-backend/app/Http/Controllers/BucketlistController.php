<?php

namespace App\Http\Controllers;

use App\Models\Bucketlist;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BucketlistController extends Controller
{
    /**
     * バケットリストを取得する（ユーザーごと）
     */
    public function index(Request $request)
    {
        $user_id = $request->input('user_id');
        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $bucketlists = $user->bucketlists()->orderBy('created_at', 'desc')->get();
        return response()->json($bucketlists);
    }

    /**
     * 新しいバケットリストを作成する
     */
    public function store(Request $request)
    {
        // バリデーション
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'is_public' => 'boolean',
            'is_achieved' => 'boolean',
            'likes' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 新しいバケットリストを作成
        $bucketlist = Bucketlist::create([
            'user_id' => $request->input('user_id'),
            'title' => $request->title,
            'is_public' => $request->is_public ?? false,
            'is_achieved' => $request->is_achieved ?? false,
            'likes' => $request->likes ?? 0,
        ]);

        return response()->json($bucketlist, 201);
    }

    /**
     * バケットリストを更新する
     */
    public function update(Request $request, $id)
    {
        // バリデーション
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'is_public' => 'boolean',
            'is_achieved' => 'boolean',
            'likes' => 'nullable|integer',
        ]);

        // dump($request->all());

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // バケットリストの取得
        $bucketlist = Bucketlist::find($id);
        if (!$bucketlist) {
            return response()->json(['message' => 'Bucketlist not found'], 404);
        }

        // 更新
        $bucketlist->update($request->only([
            'title',
            'is_public',
            'is_achieved',
            'likes',
        ]));

        return response()->json($bucketlist);
    }

    /**
     * バケットリストを削除する
     */
    public function destroy($id)
    {
        // バケットリストの取得
        $bucketlist = Bucketlist::find($id);
        if (!$bucketlist) {
            return response()->json(['message' => 'Bucketlist not found'], 404);
        }

        // 削除
        $bucketlist->delete();

        return response()->json(['message' => 'Bucketlist deleted successfully']);
    }
}
