<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Photo;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//        User::factory()->has(Album::factory()->count(10));

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',

        ]);

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'siaw@email.com',
            'password' => 'password',
            'role' => 'admin'
        ]);
        Album::factory(10)->has(Photo::factory(3))->for($admin)->create();


//        User::factory(2)->has(Album::factory()->count(3))->create();
//        Album::factory(10)->create();
    }
}
