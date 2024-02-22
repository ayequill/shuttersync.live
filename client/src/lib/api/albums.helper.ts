import axios, { Axios, AxiosResponse } from "axios";
import { Album } from "@/lib/interfaces/interfaces";


// export const UseAlbums = (userId: string, token: string) => {
//     const fetcher = (url: string) => axios.get(url, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         }
//     });

//     const url = `http://localhost:5000/users/${userId}/albums`;

//     const { data, error, isLoading } = useSwr((userId && token) ? url : null, fetcher);


//     return {
//         albums: data?.data,
//         error,
//         isLoading
//     };
// };

export const fetchAlbums = async (userId: string, token: string): Promise<Album[]> => {
    try {
        const response = await axios.get(`http://localhost:5000/users/${userId}/albums`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createAlbum = async (id: string, token: string, files: File[]): Promise<Album | unknown> => {
    try {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('photos', file);
        });
        const response = await axios.post(`http://localhost:5000/albums/${id}/photos`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const createAlbumName = async (userId: string, token: string, albumName: string): Promise<Album | unknown> => {
    try {
        const response = await axios.post(`http://localhost:5000/users/${userId}/albums`, {name: albumName}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const fetchAlbum = async (albumId: string, token: string): Promise<Album | unknown> => {
    try {
        const response = await axios.get(`http://localhost:5000/albums/${albumId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}