'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { makeBreadcrumbText } from '@/lib/utils'
import Link from 'next/link'

const CustomBreadcrumb = () => {
    const [currentLocation, setCurrentLocation] = useState<string[]>([])
    const router = useRouter()
    useEffect(() => {
        const routes = location.pathname.split('/')
        setCurrentLocation(routes)
    }, [router])

    const renderBreadcrumb = () => {
        if (!currentLocation.length) return null
        let end = currentLocation.length - 1
        const nonLinkRoute: string[] = []
        return currentLocation.map((bread, index) => {
            if (bread == '') {
                return null
            }

            if (index == end) {
                return (
                    <>
                        <BreadcrumbItem key={`bradcrumb-${index}`}>
                            <BreadcrumbPage>{makeBreadcrumbText(bread)}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )
            }

            if (nonLinkRoute.includes(bread)) {
                return (
                    <>
                        <BreadcrumbItem key={`bradcrumb-${index}`}>
                            <BreadcrumbPage>{makeBreadcrumbText(bread)}</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator key={`bradcrumb-seperator-${index}`} className="hidden md:block" />
                    </>
                )
            }

            return (
                <>
                    <BreadcrumbItem key={`bradcrumb-${index}`} className="hidden md:block">
                        <Link className='hover:underline' href={"/" + bread}>{makeBreadcrumbText(bread)}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator key={`bradcrumb-seperator-${index}`} className="hidden md:block" />
                </>
            )
        })
    }
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {renderBreadcrumb()}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default CustomBreadcrumb
