<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bucketlists', function (Blueprint $table) {
            // 不要なカラムの削除
            $table->dropColumn(['category', 'progress']);
            
            // 新しいカラムの追加
            $table->boolean('is_achieved')->default(false); // is_achievedカラムを追加
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bucketlists', function (Blueprint $table) {
            // 新しく追加したカラムを削除
            $table->dropColumn('is_achieved');
            
            // 削除したカラムを復元
            $table->string('category')->nullable();
            $table->integer('progress')->default(0);
        });
    }
};
