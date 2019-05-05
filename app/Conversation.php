<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Conversation extends Model {

    public function messages() {
        return $this->hasMany(Message::class);
    }

    public function users() {
        return $this->belongsToMany(User::class, 'users_conversations');
    }


    /**
     *
     * Helper function that returns users related
     * to the current conversation without the authenticated user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function receivers() {
        return $this->users()
            ->wherePivot('user_id', '!=', Auth::user()->id);
    }
}
