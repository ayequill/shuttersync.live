<?php

namespace Tests\Feature;

use App\Models\Album;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AlbumTest extends TestCase
{
    /**
     * A basic feature test example.
     */

    protected string $baseURL = '/api/v1/albums';

    public function test_all_albums_status(): void
    {
        $response = $this->get($this->baseURL);

        $response->assertStatus(200);
    }

    public function test_all_albums_data(): void
    {
        $response = $this->get($this->baseURL. '?photos=true');
        $response->assertOk();
    }

    public function test_show_not_found_album(): void
    {
        $response = $this->get($this->baseURL. '/uknown');
        $response->assertStatus(404);
    }

    public function test_show_album(): void
    {
        $album = Album::factory()->for(User::factory()->create())->create();

        $response = $this->get($this->baseURL. '/'. $album->id);
        $response->assertStatus(200);
    }

    public function test_patch_album(): void
    {
        $album = Album::factory()->for(User::factory()->create())->create();
        $patchReq = $this->patch($this->baseURL. '/'. $album->id, [
            'title' => 'Cool album'
        ]);

        $patchReq->assertStatus(200);
        $this->assertDatabaseHas('albums', [
            'id' => $album->id,
            'title' => 'Cool album'
        ]);

        $album->refresh();
        $this->assertEquals('Cool album', $album->title);

    }

    public function test_delete_album(): void
    {
        $album = Album::factory()->for(User::factory()->create())->create();
        $this->assertDatabaseHas($album, [
            'id' => $album->id
        ]);
        $this->delete($this->baseURL. '/'. $album->id);
        $this->assertModelMissing($album);
    }

    public function test_create_album_by_user(): void
    {
        $user = User::factory()->create();

        $res = $this->post('/api/v1/users/'. $user->id. '/albums', [
            'title' => 'Cool album'
        ]);
        $res->assertStatus(201);
    }
}
