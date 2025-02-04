<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Bucketlist;

class BucketlistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Bucketlist::create([
            'user_id' => 1,
            'title' => 'Climb Mount Everest',
            'category' => 'Travel',
            'progress' => 0,
            'is_public' => true,
            'likes' => 10,
        ]);
    }
}
