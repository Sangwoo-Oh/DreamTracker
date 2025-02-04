<?php

namespace App\Http\Controllers;

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
