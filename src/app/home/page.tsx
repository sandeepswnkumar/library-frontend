import BaseCard from '@/components/Custom/BaseCard'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function HomePage() {
    return (
        <Container>
            <SubHeaderCard>
                <h2 className="font-bold uppercase text-muted-foreground">
                    Home
                </h2>
            </SubHeaderCard>
        </Container>
    )
}

export default HomePage
