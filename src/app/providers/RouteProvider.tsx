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
    setBookingUnit,
    setFacilities,
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

    // Do not access `window`/`localStorage` during render — move to useEffect
    useEffect(() => {
        const token =
            typeof window !== 'undefined'
                ? window.localStorage.getItem('_token')
                : null
        const urlLogin =
            typeof window !== 'undefined'
                ? window.localStorage.getItem('login-url') || '/login'
                : '/login'

        if (token) {
            if (['/login', '/admin/login'].includes(pathname)) {
                router.push('/')
            }
        } else {
            router.push(urlLogin)
        }
    }, [pathname, router, auth?.currentUser])

    const getCurrentUser = async () => {
        try {
            const resp = await AuthService.getCurrentUser()

            if (resp?.data?.success) {
                dispatch(setUser(resp.data.data))
                getInitalData(dispatch)
                if (
                    resp.data?.data?.userTypeId == userTypeEnum.USER &&
                    !resp.data?.data?.isOnboardingCompleted
                ) {
                    router.push('/onboarding')
                }
            }
        } catch (err) {
        } finally {
            isLoading.current = false
            fetchedRef.current = true
        }
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

export const getInitalData = async (dispatch: any) => {
    try {
        const [
            libaryStatus,
            libaryType,
            cities,
            states,
            country,
            roomType,
            bookingUnit,
            facilities,
        ] = await Promise.allSettled([
            LibraryService.getLibraryStatus({ initalCall: true }),
            LibraryService.getLibraryType({ initalCall: true }),
            MiscellaneousService.getCities({ initalCall: true }),
            MiscellaneousService.getStates({ initalCall: true }),
            MiscellaneousService.getCountry({ initalCall: true }),
            MiscellaneousService.getRoomType({ initalCall: true }),
            MiscellaneousService.getBookingUnit({ initalCall: true }),
            MiscellaneousService.getFacilites({ initalCall: true }),
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
        if (roomType.status == 'fulfilled' && roomType?.value.data?.success) {
            dispatch(setRoomType(roomType.value.data.data))
        }
        if (
            bookingUnit.status == 'fulfilled' &&
            bookingUnit?.value.data?.success
        ) {
            dispatch(setBookingUnit(bookingUnit.value.data.data))
        }
        if (
            facilities.status == 'fulfilled' &&
            facilities?.value.data?.success
        ) {
            dispatch(setFacilities(facilities.value.data.data))
        }
    } catch (err) {
        console.log('err', err)
    }
}
