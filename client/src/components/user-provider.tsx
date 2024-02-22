"use client"
import React from 'react'
import { SessionProvider } from "next-auth/react"

export const Session = ({children, session}: {children: React.ReactNode, session: any}) => (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
)
