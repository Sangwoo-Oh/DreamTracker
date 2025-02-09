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

    protected function setUp(): void
    {
        parent::setUp();

        // テストユーザーを作成
        $user = User::create([
            'name' => 'test user account',
            'firebase_id' => '13Q4vXTA3lNORH3y3Q1ppvI7Dj12',
        ]);
    }

    /**
     * バケットリストアイテムを新規作成する
     */
    public function test_create_a_new_bucket_list_item(): void
    {

        // Arrange
        // テストユーザーでログイン
        $response = $this->post('/api/login', [
            'email' => 'test@test.com',
            'password' => 'passtest',
        ]);
        $idToken = $response->getContent();
        $idToken = trim($idToken, '"');

        // Act
        // 1. テストユーザーでバケットリストアイテムを作成
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

        // 2. バケットリストアイテムを取得
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $idToken,
            'Accept' => 'application/json',
        ])->getJson('/api/bucketlist');

        // Assert
        // バケットリストアイテムが取得できたことを確認
        $response->assertStatus(200);
        $response->assertJson([
            [
                'title' => 'test bucket list item',
                'is_public' => false,
                'is_achieved' => false,
                'likes' => 0,
            ],
        ]);
    }
    /**
     * バケットリストアイテムを取得する
     */
    public function test_get_bucket_list_items(): void
    {

        // Arrange
        // テストユーザーでログイン
        $response = $this->post('/api/login', [
            'email' => 'test@test.com',
            'password' => 'passtest',
        ]);
        $idToken = $response->getContent();
        $idToken = trim($idToken, '"');

        // テストアイテムを作成
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $idToken,
            'Accept' => 'application/json',
        ])->postJson('/api/bucketlist', [
            'title' => 'test bucket list item',
            'is_public' => false,
            'is_achieved' => false,
            'likes' => 0,
        ]);

        // Act
        // 1. バケットリストアイテムを取得
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $idToken,
            'Accept' => 'application/json',
        ])->getJson('/api/bucketlist');

        // Assert
        // バケットリストアイテムが取得できたことを確認
        $response->assertStatus(200);
        // dump($response);
        $response->assertJson([
            [
                'title' => 'test bucket list item',
                'is_public' => false,
                'is_achieved' => false,
                'likes' => 0,
            ],
        ]);
    }
    /**
     * バケットリストアイテムを更新する
     */
    public function test_update_bucket_list_item(): void
    {

        // Arrange
        // テストユーザーでログイン
        $response = $this->post('/api/login', [
            'email' => 'test@test.com',
            'password' => 'passtest',
        ]);
        $idToken = $response->getContent();
        $idToken = trim($idToken, '"');

        // テストアイテムを作成
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $idToken,
            'Accept' => 'application/json',
        ])->postJson('/api/bucketlist', [
            'title' => 'test bucket list item',
            'is_public' => false,
            'is_achieved' => false,
            'likes' => 0,
        ]);

        $item_id = $response->json('id');

        // Act
        // 1. バケットリストアイテムを更新
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $idToken,
            'Accept' => 'application/json',
        ])->patchJson('/api/bucketlist/' . $item_id, [
            'title' => 'updated bucket list item',
            'is_public' => true,
            'is_achieved' => true,
            'likes' => 1,
        ]);

        // Assert
        // バケットリストアイテムが更新されたことを確認
        
        $response->assertStatus(200);
        $response->assertJson([
            'title' => 'updated bucket list item',
            'is_public' => true,
            'is_achieved' => true,
            'likes' => 1,
        ]);
    }
    /**
     * バケットリストアイテムを削除する
     */
    public function test_delete_bucket_list_item(): void
    {

        // Arrange
        // テストユーザーでログイン
        $response = $this->post('/api/login', [
            'email' => 'test@test.com',
            'password' => 'passtest',
        ]);
        $idToken = $response->getContent();
        $idToken = trim($idToken, '"');

        // テストアイテムを作成
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $idToken,
            'Accept' => 'application/json',
        ])->postJson('/api/bucketlist', [
            'title' => 'test bucket list item',
            'is_public' => false,
            'is_achieved' => false,
            'likes' => 0,
        ]);

        $item_id = $response->json('id');

        // Act
        // 1. バケットリストアイテムを削除
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $idToken,
            'Accept' => 'application/json',
        ])->delete('/api/bucketlist/' . $item_id);

        // Assert
        // バケットリストアイテムが削除されたことを確認
        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Bucketlist deleted successfully',
        ]);
    }
}
