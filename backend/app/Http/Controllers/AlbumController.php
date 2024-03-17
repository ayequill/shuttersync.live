<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlbumRequest;
use App\Http\Requests\UpdateAlbumRequest;
use App\Http\Resources\AlbumCollection;
use App\Models\Album as AlbumModel;
use App\Http\Resources\Album;
use http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;


class AlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AlbumCollection
    {
        if ($request->query('photos')) {
            return new AlbumCollection(AlbumModel::paginate()->load('photos'));
        }

        return Cache::remember('all_albums', now()->addSeconds(60), function () {
            return new AlbumCollection(AlbumModel::paginate());
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, AlbumModel $album): Album
    {
        if ($request->query('photos')) {
        return new Album($album->load('photos'));
        }
        return new Album($album);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAlbumRequest $request, AlbumModel $album): Album
    {
        $album->update($request->validated());
        return new Album($album);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AlbumModel $album): \Illuminate\Http\Response
    {
        $album->delete();
        return response()->noContent();
    }
}
