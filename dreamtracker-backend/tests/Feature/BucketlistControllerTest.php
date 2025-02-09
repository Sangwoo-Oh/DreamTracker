<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Kreait\Laravel\Firebase\Facades\Firebase;

class BucketlistControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * バケットリストアイテムを新規作成する
     */
    public function test_create_a_new_bucket_list_item(): void
    {
        // Arrange
        // Firebaseでテストユーザーを作成
        $response = $this->post('/api/signup', [
            'email' => 'test@test.com',
            'password' => 'passtest',
            'displayName' => 'test user account',
        ]);
        $uid = $response->json()['uid'];

        // テストユーザーでログイン
        $response = $this->post('/api/login', [
            'email' => 'test@test.com',
            'password' => 'passtest',
        ]);
        $idToken = $response->getContent();
        $idToken = trim($idToken, '"');
        dump($idToken);

        // Act
        // テストユーザーでバケットリストアイテムを作成
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $idToken,
            'Accept' => 'application/json',
        ])->postJson('/api/bucketlist', [
            'title' => 'test bucket list item',
            'is_public' => false,
            'is_achieved' => false,
            'likes' => 0,
        ]);

        // Assert
        // バケットリストアイテムが作成されたことを確認
        $response->assertStatus(201);
        $response->assertJson([
            'title' => 'test bucket list item',
            'is_public' => false,
            'is_achieved' => false,
            'likes' => 0,
        ]);

        // Firebaseからテストユーザーを削除
        $auth = Firebase::auth();
        $auth->deleteUser($uid);
    }
    /**
     * バケットリストアイテムを取得する
     */
    public function test_get_bucket_list_items(): void
    {
    }
    /**
     * バケットリストアイテムを更新する
     */
    public function test_update_bucket_list_item(): void
    {
    }
    /**
     * バケットリストアイテムを削除する
     */
    public function test_delete_bucket_list_item(): void
    {
    }
}
