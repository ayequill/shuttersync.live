'use client';

import Albums from '@/components/dashboard/albums';
import AlbumToolBar from '@/components/dashboard/albumtoolbar';
import EmptyAlbums from '@/components/dashboard/empty-collections';
import { useUser } from '@/contexts/user-context';
import { fetchAlbums } from '@/lib/api/albums.helper';
import { useQuery } from '@tanstack/react-query';


export default function DashBoard({}) {
  const { user } = useUser();

  const { data, status } = useQuery({
    queryKey: ['albums'],
    queryFn: async () =>
      await fetchAlbums(user.id, user?.access_token as string),
    enabled: !!user?.id,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <AlbumToolBar />
      {status === 'success' && !data?.length && <EmptyAlbums />}
      {status === 'success' && data?.length && <Albums albums={data} />}
    </div>
  );
}
