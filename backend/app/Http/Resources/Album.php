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
            'photos' => PhotoResource::collection($this->whenLoaded('photos')),
            'userId' => $this->user_id,
            'published' => $this->published,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'cover' => PhotoResource::make($this->photos->first())
        ];
    }

}
