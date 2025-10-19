'use client'
import React, { JSX } from 'react'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
    children?: React.ReactNode
}

const SubHeaderCard = ({ children }: Props): JSX.Element => {
    return (
        <Card className="w-full bg-transparent shadow-none border-none rounded-none p-0 m-0 gap-0 mb-2">
            <CardContent className="px-3 py-2 flex justify-between items-center">
                {children}
            </CardContent>
        </Card>
    )
}

export default SubHeaderCard
