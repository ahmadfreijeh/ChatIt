<?php
/**
 * Created by PhpStorm.
 * User: ahmad
 * Date: 5/5/2019
 * Time: 2:08 PM
 */

namespace App\Business\Interfaces;


interface EventInterface {

    public function trigger($name, $type, $data = null);

    public function fireNotification($message, $user);

}