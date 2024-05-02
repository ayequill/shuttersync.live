import axios from '@/lib/axios';
import { useAuth } from '@/hooks/auth';
import { Album } from '@/lib/types/Album';

export const useFetcher = () => {
  const {csrf, user} = useAuth({
    middleware: 'auth',
  });


  const getUserAlbums = async (): Promise<Album[]> => {
    try {
      await csrf();
      const response = await axios.get(`/api/v1/users/${user?.id}/albums?photos=true`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  const createAlbum = async (name: string, photos: File[]): Promise<Album> => {
    try {
      await csrf();
      const formData = new FormData();
      formData.append('name', name);
      photos.forEach(photo => formData.append('photos', photo));
      console.log(formData)
      const response = await axios.post(`/api/v1/users/${user?.id}/albums`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  return {getUserAlbums, createAlbum}
}