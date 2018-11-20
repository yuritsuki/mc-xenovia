<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {

    static $password;

    /*$faker->addProvider(new Faker\Provider\ru_Ru\Person($faker));
    $faker->addProvider(new Faker\Provider\ru_Ru\Address($faker));
    $faker->addProvider(new Faker\Provider\ru_Ru\PhoneNumber($faker));*/

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
        'photo' => $faker->imageUrl(40, 40),
        'phone' => $faker->phoneNumber,
    ];
});
