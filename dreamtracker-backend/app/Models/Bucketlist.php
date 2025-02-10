<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bucketlist extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $fillable = [
        'user_id',
        'title',
        'is_achieved',
        'is_public',
        'likes',
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'is_achieved' => 'boolean',
    ];
}
