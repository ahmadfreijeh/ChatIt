<?php
/**
 * Created by PhpStorm.
 * User: ahmad
 * Date: 5/5/2019
 * Time: 1:53 PM
 */

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use App\Conversation;
use App\Message;

class ChatController extends Controller {

    //todo get al related conversations
    public function history(Request $request) {
        $conversations = Auth::user()
            ->conversations()
            ->with('messages', 'receivers')
            ->get();
        return Response::json(['data' => $conversations]);
    }

    //todo send message to teh user by triggering an event
    public function send(Request $request) {

        $message = new Message();
        $message->message = $request->message;
        $message->conversation_id = $request->conversation_id;
        $message->sender = Auth::user()->id;
        $message->save();

        //todo broadcast data to all users in this conversation after create the message

        return Response::json(['data' => $message]);
    }

    //todo delete conversation
    public function delete($id) {

    }

    //todo delete specific message in both side like whatsapp
    public function deleteMessage(Request $request) {

    }

    //todo open single conversation
    public function open($id, $token) {
        $conversation = Conversation::with('messages')
            ->find($id);
        return view('chat.single_conversation', compact('conversation'));
    }

    //todo archive conversation note:soft delete
    public function archive($id) {

    }

}