<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();

        User::create([
            'name' => 'Jonathan',
            'email' => 'jonathan@example.com',
            'status' => 1,
            'password' => bcrypt('password'),
        ]);

    }
}
