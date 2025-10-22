import React from 'react'

const StatusBadge = ({ status }: { status: string}) => {
    if (['Active', 'In Process'].includes(status)) {
        return (
            <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800`}
            >
                {status}
            </span>
        )
    }
    if (['Private'].includes(status)) {
        return (
            <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800`}
            >
                {status}
            </span>
        )
    }
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}
        >
            {status}
        </span>
    )
}

export default StatusBadge
