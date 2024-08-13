'use server'

import {redirect} from "next/navigation";

interface Credentials {
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
}
export async function register (credentials: Credentials) {
    const response: Response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL +'/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
     if(response.ok) {
         redirect('/signin')
     }
     if (response.status === 400) {
         const error = await response.json()
         console.log(error)
         return {
             error: error.message
         }
     }
}

