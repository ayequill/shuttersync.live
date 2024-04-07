'use client';

import Albums from '@/components/dashboard/albums';
import AlbumToolBar from '@/components/dashboard/albumtoolbar';
import EmptyAlbums from '@/components/dashboard/empty-collections';
import useSWR from 'swr';
import { useAuth } from '@/hooks/auth';
import { Album } from '@/lib/types/Album';
import { useFetcher } from '@/hooks/useFetcher';


export default function DashBoard({}) {

  const {user} = useAuth();
  const {getUserAlbums} = useFetcher()


const {data, error} = useSWR<Album[]>(user?.id && 'allAlbums', getUserAlbums)

  console.log(data)
  console.log(error)


  return (
    <div>
      <AlbumToolBar />
      {!data?.length && <EmptyAlbums />}
      {data?.length && <Albums albums={data} />}
    </div>
  );
}
