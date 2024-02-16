export interface User {
    id: string;
    createdAt: Date;
    email: string;
    name: string;
    password: string;
    verified: boolean;
    emailVerified: Date;
    image: string;
}

export interface UserWithoutPassword {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    email: string;
    name: string;
    verified: boolean | null;
    emailVerified: Date | null;
    image: string | null;
}