<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Laravel\Firebase\Facades\Firebase;
use Kreait\Firebase\Auth\UserQuery;

class FirebaseUserController extends Controller
{
    protected $auth;

    public function __construct()
    {
        $this->auth = Firebase::auth();
    }

    /**
     * Firebase にユーザーを登録
     * @return JsonResponse
     */
    public function createUser(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
            'displayName' => 'nullable|string|max:255',
            'disabled' => 'nullable|boolean',
        ]);

        $userProperties = [
            'email' => $validatedData['email'],
            'emailVerified' => false,
            'password' => $validatedData['password'],
            'displayName' => $validatedData['displayName'],
            'disabled' => $validatedData['disabled'] ?? false,
        ];

        // Firebase にユーザーを作成
        try {
            $createdUser = $this->auth->createUser($userProperties);
            return response()->json($createdUser);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * ログイン処理
     * @return JsonResponse
     */
    public function authenticateUser(Request $request) {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $email = $validatedData['email'];
        $password = $validatedData['password'];

        try {
            $signInResult = $this->auth->signInWithEmailAndPassword($email, $password);
            return response()->json($signInResult->idToken());
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * ユーザーのIdTokenを検証
     * @return JsonResponse
     */
    public function verifyIdToken(Request $request) {
        $validatedData = $request->validate([
            'idToken' => 'required|string',
        ]);

        $idToken = $validatedData['idToken'];

        try {
            $verifiedIdToken = $this->auth->verifyIdToken($idToken);
            return response()->json($verifiedIdToken);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Firebase に登録されているすべてのユーザーを取得
     * @return JsonResponse
     */
    public function getAllUsers()
    {
        $userQuery = UserQuery::all();
        $userQuery = [
            'sortBy' => UserQuery::FIELD_USER_EMAIL,
            'order' => UserQuery::ORDER_DESC,
            // 'order' => UserQuery::ORDER_DESC # this is the default
            // 'offset' => 1,
            'limit' => 499, # The maximum supported limit is 500
        ];
        $users = $this->auth->queryUsers($userQuery);
        return response()->json($users);
    }
}
