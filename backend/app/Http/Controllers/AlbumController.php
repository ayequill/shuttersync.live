<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePhotoRequest;
use App\Http\Requests\UpdateAlbumRequest;
use App\Http\Resources\Album;
use App\Http\Resources\AlbumCollection;
use App\Http\Resources\PhotoResource;
use App\Models\Album as AlbumModel;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class AlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AlbumCollection
    {
        if ($request->query('photos')) {
            return new AlbumCollection(AlbumModel::all()->load('photos')->sortDesc());
        }

        return new AlbumCollection(AlbumModel::all()->sortDesc());
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
     *
     * @param AlbumModel $album
     * @return Response
     *
     * @throws Exception
     */
    public function destroy(AlbumModel $album): Response
    {
        $album->delete();
        return response()->noContent();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function addPhoto(StorePhotoRequest $request, AlbumModel $album): Album|JsonResponse
    {
        if ($request->hasFile('photos')) {
            $file = $request->file('photos');
                    $path = $file->store('photos/'. $album->title, [
                        'disk' => 'public'
                    ]);
                    $uploadedFileUrl = Cloudinary::upload($file->getRealPath())->getSecurePath();
                    $album->photos()->create([
                        'file_path' => $path,
                        'img_url' => $uploadedFileUrl,
                        'size' => $file->getSize()
                    ]);
                return response()->json(['message' => 'Photos uploaded successfully', 'photos' =>PhotoResource::collection($album->photos()->get()),] ,201);
        }
        return response()->json(['message' => 'No photo provided'], 400);
    }
}
