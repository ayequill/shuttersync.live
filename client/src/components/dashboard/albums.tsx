import React from "react";
import AlbumCard from "./albumcard";
import { Album } from '@/lib/types/Album';


export default function Albums({ albums }: { albums: Album[] }) {
  return (
    <div className="flex flex-1 flex-wrap justify-center">
      {albums.map((album) => (
        <div key={album.id}>
          <div className="px-3 py-4">
            <AlbumCard album={album} />
          </div>
        </div>
      ))}
    </div>
  );
}
