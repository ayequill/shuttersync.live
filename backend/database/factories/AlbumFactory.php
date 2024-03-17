<?php

namespace Database\Factories;

use App\Models\Album;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Album>
 */
class AlbumFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->text(10),
            'description' => fake()->text,
            'published' => fake()->randomElement(['true', 'false'])
        ];
    }
}
