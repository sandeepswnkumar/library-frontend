'use client'
import React, { JSX } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'

type headerButtonType = {
    type: string
    subType?: string
    action?: JSX.Element
    onClick?: () => void
}

type Props = {
    cardTitle?: string
    children?: React.ReactNode
    isFooterEnabled?: boolean
    cardContentClass?: string
    cardClass?: string
    headerButton?: headerButtonType[]
}

const BaseCard = ({
    cardTitle,
    children,
    cardContentClass = '',
    cardClass = '',
    headerButton = [],
}: Props): JSX.Element => {
    return (
        <Card className={`w-full p-0 pb-4 gap-0 rounded-xs ${cardClass}`}>
            {cardTitle && (
                <CardHeader className="p-0">
                    <CardTitle className="border-b py-3 px-5 border-dashed flex justify-between items-center">
                        <span>{cardTitle}</span>
                        {headerButton.length > 0 && (
                            <div>
                                {headerButton.map((button) => {
                                    if (button.type == 'ADD') {
                                        if (button.subType == 'MODAL') {
                                            return button.action
                                        }
                                        return (
                                            <PlusCircle
                                                className="text-purple-700 cursor-pointer"
                                                size={16}
                                            />
                                        )
                                    }
                                })}
                            </div>
                        )}
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
