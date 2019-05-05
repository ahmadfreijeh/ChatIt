<?php
/**
 * Created by PhpStorm.
 * User: ahmad
 * Date: 5/5/2019
 * Time: 1:53 PM
 */

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;

class ChatController extends Controller {

    //todo get al related conversations
    public function history(Request $request) {
        $conversations = Auth::user()
            ->conversations()
            ->with('messages','receivers')
            ->get();
        return Response::json(['data' => $conversations]);
    }

    //todo send message to teh user by triggering an event
    public function send(Request $request) {

    }

    //todo delete conversation
    public function delete($id) {

    }

    //todo delete specific message in both side like whatsapp
    public function deleteMessage(Request $request) {

    }

    //todo open single conversation
    public function open($id, $token) {

    }

    //todo archive conversation note:soft delete
    public function archive($id) {

    }

}