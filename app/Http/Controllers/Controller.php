<?php

namespace App\Http\Controllers;

use App\Business\EventBL;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController {
    public $event;
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct() {
        $this->event = new EventBL();
    }
}
