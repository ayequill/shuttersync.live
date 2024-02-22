export interface User {
    id: string;
    email: string;
    name: string;
    password?: string;
    createdAt: string;
    updatedAt: string;
    verified: boolean;
    image: string | null;
    emailVerified: boolean | null;
    albums: Album[];
}

export interface Album {
    id: string;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string;
    photos: Photo[];
    published: boolean;
    locked: boolean;
}

export interface Photo {
    id: string;
    imgUrl: string;
    size: string;
    publicId: string;
    storageUrl: string;
    name: string;
    albumId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}
