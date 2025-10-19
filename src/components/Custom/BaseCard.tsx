'use client'
import React, { JSX } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

type Props = {
    cardTitle?: string
    children?: React.ReactNode
    isFooterEnabled?: boolean
    cardContentClass?: string
    cardClass?: string
}

const BaseCard = ({
    cardTitle,
    children,
    cardContentClass = '',
    cardClass = '',
}: Props): JSX.Element => {
    return (
        <Card className={`w-full p-0 pb-4 gap-0 rounded-xs ${cardClass}`}>
            {cardTitle && (
                <CardHeader className="p-0">
                    <CardTitle className="border-b py-3 px-5 border-dashed">
                        {cardTitle}
                    </CardTitle>
                </CardHeader>
            )}
            <CardContent className={`py-5 px-5 ${cardContentClass}`}>
                {children ? children : 'No Data Found'}
            </CardContent>
        </Card>
    )
}

export default BaseCard
