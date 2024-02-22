import React, { useEffect, useState } from 'react';
import { Album, Photo } from '@/lib/interfaces/interfaces';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { FaEllipsis } from "react-icons/fa6";
import Link from 'next/link';


function AlbumCard({ album }: { album: Album }) {
    const [cover, setCover] = useState<Photo>();

    useEffect(() => {
      if (album && album.photos && album?.photos?.length > 0) {
        setCover(album?.photos[0]);
      }
    }, [album]);
    const datePublished = album?.createdAt
      ? new Date(album.createdAt).toLocaleDateString()
      : '';

    return (
      <div className="flex flex-col gap-2 px-2 rounded-md bg-[#0b1523] py-4 sm:max-">
        <div className='md:max-w-[350px] max-h-[350px]'>
        <Image
          className="object-cover rounded-xl mb-4 md:max-w-[350px] max-h-[350px] min-h-[350px] min-w-[350px]"
          src={cover?.imgUrl ?? 'https://placehold.co/400'}
          alt={album.name}
          width={400}
          height={400}
        />
        </div>
        <div className='flex justify-between px-1 py-2'>
        <h3 className='font-medium'>{album.name}</h3>
        {album.published ? <Badge variant="outline">Published</Badge> : <Badge variant="destructive">Not shared</Badge>}
        </div>
        <div className="flex justify-between w-full bg-secondary rounded-lg p-3">
          <div className="">
            <Badge variant="default">{album.photos.length} photos</Badge>
            <p className='font-medium mt-1'>{datePublished}</p>
          </div>
          <div className='flex gap-2 items-center'>
            <AlbumOptions id={album.id} />
          </div>
        </div>
      </div>
    );
  }

function AlbumOptions({id}: {id: string}) {
  return (
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>
        <FaEllipsis className='text-lg' />
    </MenubarTrigger>
    <MenubarContent>
      <MenubarItem asChild>
        <Link href={`/dashboard/album/${id}`}>
        View Album
        </Link>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Edit Album</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Delete</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
  )
}

  export default AlbumCard;