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
