<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserConversation extends Model {

    protected $table = 'users_conversations';

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function conversation() {
        return $this->belongsTo(Conversation::class);
    }
}
