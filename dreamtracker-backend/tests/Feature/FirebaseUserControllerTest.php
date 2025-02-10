<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Kreait\Laravel\Firebase\Facades\Firebase;

class FirebaseUserControllerTest extends TestCase
{
    use WithFaker;
    // use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_create_a_user(): void
    {


        // Firebaseでユーザーを作成する
        $response = $this->post('/api/signup', [
            'email' => $this->faker->unique()->safeEmail(),
            'password' => 'password',
            'displayName' => 'test user account',
        ]);

        // ユーザーが作成されたことを確認する
        $response->assertStatus(200);

        // ユーザー(test user account)が追加されていることを確認する
        $uid = $response->json()['uid'];
        $auth = Firebase::auth();
        $user = $auth->getUser($uid);
        dump($user);
        $this->assertEquals('test user account', $user->displayName);

        // ユーザーがPostgreSqlにも追加されていることを確認する
        $this->assertDatabaseHas('users', [
            'name' => 'test user account',
            'firebase_id' => $uid,
        ]);

        // ユーザーを削除する
        $auth->deleteUser($uid);
    }
}