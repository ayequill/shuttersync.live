'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fetchAlbums } from '@/lib/api/albums.helper';
import { useUser } from '@/contexts/user-context';
import { useQuery } from '@tanstack/react-query';
import AlbumToolBar from '@/components/dashboard/albumtoolbar';
import EmptyAlbums from '@/components/dashboard/empty-collections';
import Albums from '@/components/dashboard/albums';


// export const metadata: Metadata = {
//   title: 'Dashboard',
//   description: 'Dashboard page',
//   // tags: ['nextjs', 'react', 'typescript'],
//   // slug: 'dashboard'
//   keywords: 'dashboard, albums, photos',
//   robots: 'noindex, nofollow',
// };

// export { metadata };

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
