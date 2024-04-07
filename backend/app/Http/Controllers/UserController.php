<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlbumRequest;
use App\Http\Resources\AlbumCollection;
use App\Models\Album;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\Album as AlbumResource;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Create a new album.
     *
     * @param StoreAlbumRequest $request
     * @param User $user
     * @return AlbumResource
     */
    public function createAlbum(StoreAlbumRequest $request, User $user): AlbumResource
    {
        $album = $user->albums()->create($request->validated());
        $album->slug = $album->slug ?: Str::slug($album->title);
        return new AlbumResource($album);
    }

    /**
     * Get all user albums
     *
     * @param User $user
     * @return AlbumCollection|JsonResponse
     */
    public function albums(Request $request, User $user): AlbumCollection | JsonResponse
    {
        if ($request->query('photos')) {
            return new AlbumCollection($user->albums()->with('photos')->get());
        }
        return new AlbumCollection($user->albums()->get());
    }

    public function update()
    {

    }
}
