import React from 'react';
import { Album } from '@/lib/types/Album';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

import AlbumOptions from '@/components/dashboard/album-options'

function AlbumCard({ album }: { album: Album }) {
  const datePublished = album?.createdAt
    ? new Date(album.createdAt).toLocaleDateString()
    : '';

  return (
    <div className="flex flex-col rounded-3xl dark:bg-[#0b1523] border sm:max- shadow-lg">
      <div className="md:max-w-[350px] max-h-[350px] relative drop-shadow-2xl">
        <Image
          className="object-cover mb- md:max-w-[350px] max-h-[320px] min-h-[320px] min-w-[320px] rounded-3xl"
          src={album.cover?.url || 'https://via.placeholder.com/400'}
          alt={album.title}
          width={400}
          height={400}
        />
        <div className="absolute top-9 left-3">
          <Badge className="px-3 py-2 rounded-3xl opacity-85 text-sm" variant="secondary">
            {album.photos.length} photos
          </Badge>
        </div>
        <div className="absolute top-9 right-1">
          <AlbumOptions id={album.id} />
        </div>
      </div>
      <div className="flex justify-between items-center px-3 py-3">
        <div className="">
        <h3 className="font-medium">{album.title}</h3>
        <p className="font-medium mt-">Created on {datePublished}</p>
        </div>
        {album.published ? (
          <Badge variant="outline">Published</Badge>
        ) : (
          <Badge variant="destructive">Not shared</Badge>
        )}
      </div>

    </div>
  );
}

export default AlbumCard;
