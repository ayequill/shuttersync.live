<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlbumRequest;
use App\Http\Resources\AlbumCollection;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\Album as AlbumResource;

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
        return new AlbumResource($user->albums()->create($request->validated()));
    }

    /**
     * Get all user albums
     *
     * @param User $user
     * @return AlbumCollection|JsonResponse
     */
    public function albums(User $user): AlbumCollection | JsonResponse
    {
        return new AlbumCollection($user->albums()->paginate(20));
    }
}
