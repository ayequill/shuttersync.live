import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import { login } from '@/lib/api/auth.helper'
import { User } from '@/lib/interfaces/interfaces'
import axios from '@/lib/axios';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { NextApiRequest } from 'next';


// const getCookiesFromResponse = (res) => {
//     let cookies = res.headers['set-cookie'][0].split(';')[0] + '; '
//     cookies += res.headers['set-cookie'][1].split(';')[0] + '; '
//     return cookies
// }
//
// const getXXsrfToken = (res) => {
//     return decodeURIComponent(res.headers['set-cookie'][0].split(';')[0].replace('XSRF-TOKEN=',''))
// }

// const makeRequest = async (method='get', url: string, dataForm = null, res_cookies ) => {
//     const cookies = res_cookies != null ? getCookiesFromResponse(res_cookies) : null
//     const res = await axios.request({
//         method: method,
//         url: url,
//         data: dataForm,
//         headers: {
//             origin: process.env.NEXTAUTH_URL_INTERNAL, // this is your front-end URL, for example in local -> http://localhost:3000
//             Cookie: cookies, // set cookie manually on server
//             "X-XSRF-TOKEN": res_cookies ? getXXsrfToken(res_cookies) : null
//         },
//         withCredentials: true,
//         credentials: true,
//     })
//     return res
// }

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
                await axios.get('/sanctum/csrf-cookie')
                const res = await axios.post('/api/v1/login', credentials)

                if (res.status === 200) {
                    return res.data;
                }
                console.log(res)
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