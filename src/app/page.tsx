'use client'
import { assets } from '@/assets/assets'
import BaseCard from '@/components/Custom/BaseCard'
import Datatable from '@/components/Custom/Datatable'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {
    useEffect(() => {
        console.log('here')
    }, [])
    return (
        <Container>
            <SubHeaderCard>
                <h2 className="font-semibold">Dashboard</h2>
                <div>
                    <Link href={'/library/create'}>
                        <Button variant={'outline'}>Add Library</Button>
                    </Link>
                </div>
            </SubHeaderCard>

            <BaseCard></BaseCard>
        </Container>
    )
}
