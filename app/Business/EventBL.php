<?php
/**
 * Created by PhpStorm.
 *
 * This class will be responsiblle for firring events from
 * the events folder such as ChatEvent, Notifications etc...
 *
 * It will have a trigger() event that will take the name of the event
 * It will have fireNotification() function that will fire the notifications based ion name passed to the params
 *
 * This class will implement EventInterface
 *
 * User: ahmad
 * Date: 5/5/2019
 * Time: 2:04 PM
 */

namespace App\Business;


use App\Business\Interfaces\EventInterface;
use App\Events\ChatEvent;
use Illuminate\Support\Facades\Auth;

class EventBL implements EventInterface {

    public function trigger($name, $users, $data = null) {
        $sender = Auth::user();
        foreach ($users as $user) {
            switch ($name) {
                case 'chat':
                    broadcast(new ChatEvent($sender, $user, $data));
                    break;
            }
        }
    }

    public function fireNotification($message, $user) {
        // TODO: Implement fireNotification() method.
    }
}