'use client';

import Albums from '@/components/dashboard/albums';
import AlbumToolBar from '@/components/dashboard/albumtoolbar';
import EmptyAlbums from '@/components/dashboard/empty-collections';
import useSWR from 'swr';
import { useAuth } from '@/hooks/auth';
import { Album } from '@/lib/types/Album';
import { useFetcher } from '@/hooks/useFetcher';
import Loading from '@/app/dashboard/album/[id]/loading';


export default function DashBoard({}) {

  const {user} = useAuth();
  const {getUserAlbums} = useFetcher()


const {data, error, isLoading} = useSWR<Album[]>(user?.id && 'allAlbums', getUserAlbums)

  return isLoading ? <Loading /> : (
    <div>
      {/*{isLoading && <Loading />}*/}
      {data && <AlbumToolBar />}
      {data &&  !data?.length && <EmptyAlbums />}
      {data?.length && <Albums albums={data} />}
    </div>
  );
}
