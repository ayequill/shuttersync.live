interface Photo {
    id: string;
    albumId: string;
    url: string;
    filePath: string;
    size: string;
    createdAt: string;
    updatedAt: string;
}

interface Cover {
    id: string;
    albumId: string;
    url: string;
    filePath: string;
    size: string;
    createdAt: string;
    updatedAt: string;
}

interface Album {
    id: string;
    title: string;
    description: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    slug: string;
    photos: Photo[];
    cover: Cover;
}

export type { Album, Photo, Cover };
