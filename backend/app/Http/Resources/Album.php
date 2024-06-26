<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Album extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
        public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'published' => $this->published,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'slug' => $this->slug,
            'photos' => PhotoResource::collection($this->whenLoaded('photos')),
            'cover' => PhotoResource::make($this->photos->first())
        ];
    }

}
