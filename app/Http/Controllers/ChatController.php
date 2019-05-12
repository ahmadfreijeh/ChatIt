<?php
/**
 * Created by PhpStorm.
 * User: ahmad
 * Date: 5/5/2019
 * Time: 1:53 PM
 */

namespace App\Http\Controllers;


use App\Events\ChatEvent;
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

        $conversation = Conversation::find($request->conversation_id);
        $authedUser = Auth::user();

        if ($conversation) {
            $message = new Message();
            $message->message = $request->message;
            $message->conversation_id = $conversation->id;
            $message->sender = $authedUser->id;

            if ($message->save()) {
                $users = $conversation->users()
                    ->wherePivot('user_id', '!=', $authedUser->id)
                    ->get();
                $this->event->trigger('chat', $users, $message);
            }
        }

        return Response::json(['data' => $message]);
    }

    //todo delete conversation
    public function delete(Request $request) {
        $conversation = Conversation::find($request->conversation_id);
        if ($conversation) {
            $conversation->delete();
        }
        return Response::json(['data' => "Conversation deleted"]);
    }

    //todo delete specific message in both side like whatsapp
    public function deleteMessage(Request $request) {

    }

    //todo open single conversation
    public function open($id, $token) {
        $conversation = Conversation::with('messages', 'receivers')
            ->find($id);
        return view('chat.single_conversation', compact('conversation'));
    }

    //todo archive conversation note:soft delete
    public function archive($id) {

    }

}