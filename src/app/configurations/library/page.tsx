import React from 'react'
import BaseCard from '@/components/Custom/BaseCard'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const LibraryConfiguration = () => {
    return (
        <Container>
            <SubHeaderCard>
                <h2 className="font-bold uppercase text-muted-foreground">
                    Libaray Configurations
                </h2>
                <div className='flex gap-2'>
                    <Link href={'/library/create'}>
                        <Button variant={'outline'} className="bg-white">
                            Add Room Type
                        </Button>
                    </Link>
                    <Link href={'/library/create'}>
                        <Button variant={'outline'} className="bg-white">
                            Add Shift
                        </Button>
                    </Link>
                </div>
            </SubHeaderCard>
            <div className="flex flex-col gap-4">
                <BaseCard cardTitle="Room Type"></BaseCard>
                <BaseCard cardTitle="Shift And Pricing"></BaseCard>
            </div>
        </Container>
    )
}

export default LibraryConfiguration
