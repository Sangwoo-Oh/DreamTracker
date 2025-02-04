<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // サンプルユーザーを作成
        User::create([
            'name' => 'John Doe',
            'firebase_id' => '1234567890',
        ]);
    }
}
