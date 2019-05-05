<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model {

    public function conversation() {
        return $this->belongsTo(Conversation::class);
    }

    //todo
//    public function sender() {
//        return $this->hasOne(User::class, 'sender_id');
//    }
}
