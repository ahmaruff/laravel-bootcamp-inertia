<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Report extends Model
{
    protected $fillable = [
        'user_id', // ini user yang melaporkan
        'chirp_id',
        'notes',
        'is_resolved'
    ];

    protected $casts = [
        'is_resolved' => 'boolean'
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function chirp() : BelongsTo
    {
        return $this->belongsTo(Chirp::class);
    }
}