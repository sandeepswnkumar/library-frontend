'use client'
import React, { useEffect, useState } from 'react'

const useDebounce = (
    value: undefined | string | number = undefined,
    delay: number = 0
) => {
    const [currentState, setCurrentState] = useState<
        undefined | string | number
    >(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentState(value)
        }, delay)

        return () => {
            clearTimeout(timeout)
        }
    }, [value, delay])

    return currentState
}

export default useDebounce
