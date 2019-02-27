<?php

use Illuminate\Database\Seeder;
use App\Role;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $role_administrator = Role::where('name', 'administrator')->first();


        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'metavice@gmail.com',
            'role_id' => $role_administrator->id,
            'password' => bcrypt('123456'),
            'phone' => '8 (777) 777 77 77',
        ]);
    }
}
