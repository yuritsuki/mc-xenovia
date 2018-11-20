<?php

namespace App\Http\Controllers;

use App\User;
use App\php;
use App\UserPasswordReset;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Manager;

class UserController extends Controller
{

    public function authenticated(Request $request)
    {
        $users = User::where('id', $request->user()->id)
            ->with('role')
            ->get();
        return $users;
    }


    public function items(Request $request)
    {

        
        return User::with('role')->filter(Input::all())->orderBy('id', 'desc')->paginate(20);
        

    }

    public function all(Request $request)
    {
        
        return User::whereHas('role', function ($query) {
                $query->where('name', 'administrator');
        })->get();
    }

    public function item($id)
    {

        return User::where('id', $id)
            ->with([
                'role',
            ])->first();

    }


    public function save(request $request)
    {


        $id = $request->get('id') ? $request->get('id') : 0;

        $this->validate($request, [
            'name' => 'required|string|max:255',
            'password' => 'nullable|string|min:6|confirmed',
            'email' => 'nullable|email',
            'phone' => 'required',
            'photo' => 'image64:jpeg,jpg,png',
            'role_id' => 'required',
        ]);


        $user = $id ? User::find($id) : new User();

        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->phone = $request->get('phone');
        $user->role_id = $request->get('role_id');
        if($request->get('photo'))
            $user->photo = $request->get('photo');
        if($request->get('password'))
            $user->password = bcrypt($request->get('password'));
        $nocrypt=$request->get('password');
        $user->save();

    }

    public function savePhoto(request $request)
    {

        $id = $request->get('id') ? $request->get('id') : 0;

        $this->validate($request, [
            'photo' => 'image64:jpeg,jpg,png',
        ]);

        $user = User::find($id);
        if($request->get('photo'))
            $user->photo = $request->get('photo');
        $user->save();

    }


    public function delete($id)
    {

        $user = User::find($id);
        User::destroy($id);

    }

    public function accounts(request $request) {
        $phone = $request->get('phone');

        $users = User::where('phone','like',$phone)
            ->with(['role'])
            ->get();

        return response()->json(['status' => 'success', 'data' => $users], 200);
    }


    public function sendResetCode($id) {
        $reset = UserPasswordReset::create([
            'user_id' => $id,
            'code' => rand(1000,9999),
            'token' => md5($id.Carbon::now()->toDateTimeString()),
            'expires_at' => Carbon::now()->addMinutes(15)->toDateTimeString()
        ]);

        $user = User::find($id);
        sms_send($user->phone,'Код подтверждения: '.$reset->code);

        return response()->json(['status' => 'success', 'token' => $reset->token], 200);
    }

    public function checkResetCode(request $request) {
        $reset = UserPasswordReset::where('token',$request->get('token'))
            ->first();
        if($reset->code == $request->get('code')) {
            return response()->json(['status' => 'success'], 200);
        } else {
            return response()->json(['status' => 'failed'], 422);
        }
    }

    public function resetPass($id, request $request) {
        $this->validate($request, [
            'password' => 'string|min:6|confirmed',
        ]);
        $user = User::find($id);
        $user->password = bcrypt($request->get('password'));
        $nocrypt=$request->get('password');
        $user->save();
        sms_send($user->phone, 'Ваш пароль: '.$nocrypt);
        return response()->json(['status' => 'success'], 200);
    }

    public static function deleteTokens() {
        UserPasswordReset::where('expires_at','<',Carbon::now()->toDateTimeString())
            ->delete();
    }
}
