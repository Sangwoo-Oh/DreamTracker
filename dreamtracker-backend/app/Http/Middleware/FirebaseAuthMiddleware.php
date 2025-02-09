<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Kreait\Laravel\Firebase\Facades\Firebase;
use Kreait\Firebase\Exception\Auth\RevokedIdToken;
use App\Models\User;

class FirebaseAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $idToken = $request->bearerToken();
        if (!$idToken) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $auth = Firebase::auth();

        try {
            $verifiedIdToken = $auth->verifyIdToken($idToken);
            $firebase_uid = $verifiedIdToken->claims()->get('sub');
            $user_id = User::where('firebase_id', $firebase_uid)->first()->id;
            $request->merge(['user_id' => $user_id]);
            return $next($request);
        } catch (RevokedIdToken $e) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
