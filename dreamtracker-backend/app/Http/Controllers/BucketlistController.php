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
        // ユーザーIDが指定されている場合、指定されたユーザーのリストを取得
        // $user = $request->user(); // Firebase認証でのユーザー情報取得（仮）
        
        // $bucketlists = $user->bucketlists()->get(); // ユーザーに関連するバケットリストを取得
        $bucketlists = Bucketlist::all(); // 仮のバケットリスト取得
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
            'title' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'progress' => 'nullable|integer|min:0|max:100',
            'is_public' => 'nullable|boolean',
            'likes' => 'nullable|integer',
        ]);

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
            'category',
            'progress',
            'is_public',
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
