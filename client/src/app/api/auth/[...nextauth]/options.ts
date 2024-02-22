import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import { login } from '@/lib/api/auth.helper'
import { User } from '@/lib/interfaces/interfaces'

export const authOptions : AuthOptions = {
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    pages: {
        signIn: '/signin',
        signOut: '/logout',
        error: '/',
    },
    secret: process.env.JWT_SECRET,
    providers: [CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {},
            password: {},
        }, async authorize(credentials, req) {
            try {
                const res = await login({email: credentials?.email || "", password: credentials?.password || ""})
                if ((res as User)?.id) {
                    return res as User;
                }
            } catch (error) {
                console.error(error)
                return null;
            }
            return null;
        },
    }),
    // GithubProvider({
    //     profile(profile) {
    //         return {
    //             id: profile.id,
    //             name: profile.name,
    //             email: profile.email,
    //             image: profile.avatar_url,
    //         }
    //     },
    //     clientId: process.env.GITHUB_ID as string,
    //     clientSecret: process.env.GITHUB_SECRET as string,
    // })
],


    callbacks: {
        async session({ session, token }) {

            return {...session, ...token};
        },

        async jwt({ token, user, session }) {
            token = { ...token, ...user };
            return token;
        },
    }
}