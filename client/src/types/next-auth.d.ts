import NextAuth from "next-auth";

declare module "next-auth" {
  export interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      verified?: boolean;
      // firstName: string;
      // lastName: string;
      createdAt?: string;
    };
  }
}