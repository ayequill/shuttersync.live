import {Album} from "@/lib/interfaces/interfaces";

export interface User {
    id: string;
    email: string;
    name: string;
    password?: string;
    createdAt: string;
    updatedAt: string;
    verified: boolean;
    image: string | null;
    emailVerifiedAt: string;
    albums: Album[];
}