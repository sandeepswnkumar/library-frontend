import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'
import RouteProvider from './providers/RouteProvider'
import { Toaster } from '@/components/ui/sonner'
// import { useEffect } from 'react'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Library Management System',
    description: 'A web application for managing library resources',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
   
    // useEffect(() => {
    //     console.log("main layout 1")
    // }, [])
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <StoreProvider>
                    <RouteProvider>{children}</RouteProvider>
                </StoreProvider>
                <Toaster />
            </body>
        </html>
    )
}
