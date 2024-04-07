'use client'

import {useUser} from '@/contexts/user-context';
import {fetchAlbum} from '@/lib/api/albums.helper';
import {Album, Photo} from '@/lib/interfaces/interfaces';
import {useQuery} from '@tanstack/react-query';
import Image from "next/image";


export default function AlbumView({params}: { params: { id: string } }) {
    const {user} = useUser();

    const {data, status} = useQuery({
        queryKey: ['album', params?.id],
        queryFn: async () =>
            await fetchAlbum(params?.id, user?.access_token as string) as Album,
        enabled: !!user?.id,
        refetchOnWindowFocus: false,
    });


    return (
        <div className='container mx-auto'>
            {/*{status === 'pending' && <div>Loading...</div>}*/}
            {/*{status === 'error' && <div>Error fetching album</div>}*/}
            {status === 'success' && (
                <div className='md:container mx-auto'>
                    <h1 className='text-center my-6'>{data?.name}</h1>
                    <div className='flex flex-wrap gap-2 justify-center items'>
                        {data?.photos.map((photo: Photo) => (
                            <Image className='max-w-36 md:max-w-52 rounded-md shadow-md' alt={photo.name} key={photo.id}
                                   src={photo.imgUrl} width={400} height={400}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
