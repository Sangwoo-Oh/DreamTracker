<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class GeminiControllerTest extends TestCase
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
     * AI提案のアイテムを取得する
     */
    public function test_get_ai_suggested_items(): void
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
        // 1. AI提案のアイテムを取得
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $idToken,
            'Accept' => 'application/json',
        ])->postJson('/api/gemini/suggested', [
            'numberOfItems' => 10,
            'language' => 'Japanese',
            'attributes' => "男、27歳、会社員、既婚",
            'preferences' => "アウトドア、社交的、海外旅行"
        ]);
        
        // dump($response->getContent());
        
        // Assert
        // AI提案のアイテムが取得されたことを確認
        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'suggest_id',
                'title',
            ],
        ]);
    }

}
