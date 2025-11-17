'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setUser } from '@/lib/features/auth/AuthSlice'
import AuthService from '@/services/AuthService'
import Loader from '@/components/Custom/Loader'
import LibraryService from '@/services/LibraryService'
import {
    setLibraryStatus,
    setLibraryType,
} from '@/lib/features/libarary/librarySlice'
import MiscellaneousService from '@/services/MiscellaneousService'
import {
    setCities,
    setCountry,
    setStates,
    setRoomType,
} from '@/lib/features/MiscellaneousSlice'
import userTypeEnum from '@/Enums/UserTypeEnum'

export default function RouteProvider({
    children,
}: {
    children?: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const fetchedRef = useRef(false)
    const isLoading = useRef(false)

    const getCurrentUser = async () => {
        try {
            const resp = await AuthService.getCurrentUser()
            if (resp?.data?.success) {
                dispatch(setUser(resp.data.data))
                getInitalData()
                if (
                    resp.data?.data?.userTypeId == userTypeEnum.USER &&
                    !resp.data?.data?.isOnboardingCompleted
                ) {
                    router.push('/onboarding')
                }
            }
        } catch (err) {
            console.log('error', err)
        } finally {
            isLoading.current = false
            fetchedRef.current = true
        }
    }

    const getInitalData = async () => {
        try {
            const [
                libaryStatus,
                libaryType,
                cities,
                states,
                country,
                roomType,
            ] = await Promise.allSettled([
                LibraryService.getLibraryStatus(),
                LibraryService.getLibraryType(),
                MiscellaneousService.getCities(),
                MiscellaneousService.getStates(),
                MiscellaneousService.getCountry(),
                MiscellaneousService.getRoomType(),
            ])

            if (cities.status == 'fulfilled' && cities?.value.data?.success) {
                dispatch(setCities(cities.value.data.data))
            }
            if (states.status == 'fulfilled' && states?.value.data?.success) {
                dispatch(setStates(states.value.data.data))
            }
            if (country.status == 'fulfilled' && country?.value.data?.success) {
                dispatch(setCountry(country.value.data.data))
            }
            if (
                libaryStatus.status == 'fulfilled' &&
                libaryStatus?.value.data?.success
            ) {
                dispatch(setLibraryStatus(libaryStatus.value.data.data))
            }
            if (
                libaryType.status == 'fulfilled' &&
                libaryType?.value.data?.success
            ) {
                dispatch(setLibraryType(libaryType.value.data.data))
            }
            if (
                roomType.status == 'fulfilled' &&
                roomType?.value.data?.success
            ) {
                dispatch(setRoomType(roomType.value.data.data))
            }
        } catch {}
    }

    useEffect(() => {
        if (
            !fetchedRef.current &&
            (!auth || !auth.currentUser) &&
            localStorage.getItem('_token')
        ) {
            isLoading.current = true
            getCurrentUser()
        }
    }, [auth, dispatch])

    if (isLoading.current) {
        return <Loader />
    }

    return <>{children}</>
}
