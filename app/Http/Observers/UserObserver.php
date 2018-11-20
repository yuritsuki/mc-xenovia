<?php

namespace App\Observers;

use App\Statistic;
use App\User;
use Carbon\Carbon;

class UserObserver
{
    /**
     * Listen to the User created event.
     *
     * @param  User  $user
     * @return void
     */
    public function saving(User $user)
    {
        if (!$user->password){
            $password = bin2hex(openssl_random_pseudo_bytes(4));
           // $password = 123456;
            $user->password = bcrypt($password);

        }
    }



    public function deleting(User $user)
    {


    }
}