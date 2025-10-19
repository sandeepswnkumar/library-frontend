'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setUser } from '@/lib/features/auth/AuthSlice'
import AuthService from '@/services/AuthService'
import Loader from '@/components/Custom/Loader'

export default function RouteProvider({ children }: { children?: React.ReactNode }) {
    const pathname = usePathname()
    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const fetchedRef = useRef(false)
    const isLoading = useRef(false)
    // const [isLoading, setIsLoading] = React.useState(false)

    useEffect(() => {
        // runs on initial client mount and whenever pathname changes
        console.log('here', pathname)
    }, [pathname])

    const getCurrentUser = async () => {
        try {
            const resp = await AuthService.getCurrentUser()
            if (resp?.data?.success) {
                dispatch(setUser(resp.data.data))
            }
        } catch (err) {
            console.log("error", err)
            // ignore or handle error
        } finally {
            isLoading.current = false
            fetchedRef.current = true
        }
    }

    useEffect(() => {
        // When auth has no currentUser and we haven't fetched yet, fetch it

        if (!fetchedRef.current && (!auth || !auth.currentUser)) {
            isLoading.current = true
            getCurrentUser()
        }
    }, [auth, dispatch])

    if (isLoading.current) {
        // Simple fullscreen loader while auth is being fetched
        return <Loader />
    }

    return <>{children}</>
}
