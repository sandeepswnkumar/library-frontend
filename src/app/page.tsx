'use client'
import { assets } from '@/assets/assets'
import BaseCard from '@/components/Custom/BaseCard'
import Datatable from '@/components/Custom/Datatable'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import DashBoardHero from '@/components/dashboard/page'
import Container from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'

export default function Home() {
    useEffect(() => {
        console.log('here')
    }, [])
    const bgStyle = useMemo(
        () => ({
            // background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${assets.bgHero.src})`,
            // backgroundPosition: 'center',
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            // position: 'relative',
            minHeight: '100vh',
        }),
        []
    )

    return (
        <Container>
            {/* <SubHeaderCard>
                <h2 className="font-semibold">Title</h2>
                <div>
                    <Link href={'/library/create'}>
                        <Button variant={'outline'}>Add Library</Button>
                    </Link>
                </div>
            </SubHeaderCard> */}
            <BaseCard>
                <DashBoardHero />
            </BaseCard>
            {/* <div style={bgStyle}>
                <div className="text-center text-white py-5">Kuldeep</div>
            </div> */}
        </Container>
    )
}
