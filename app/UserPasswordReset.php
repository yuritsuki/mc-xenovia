<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class UserPasswordReset extends Model
{
    public $fillable = ['user_id','code','token','expires_at'];
    public $timestamps = false;

}