'use client'
import BaseCard from '@/components/Custom/BaseCard'
import Container from '@/components/layout/Container'
import { Label } from '@/components/ui/label'
import React, { useEffect, useReducer } from 'react'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useAppSelector } from '@/lib/hooks'
import { Library } from 'lucide-react'
import Link from 'next/link'
import useDebounce from '@/hooks/useDebounce'
import Constant from '@/lib/Constants'
import LibraryService from '@/services/LibraryService'

export default function ChooseLibrary() {
    const [event, updateEvent] = useReducer(
        (prev, next) => {
            return { ...prev, ...next }
        },
        {
            libraries: [],
            queryParams: {
                libraryName: '',
                cityId: '',
            },
        }
    )
    const misc = useAppSelector((state) => state.misc)
    const debouncedLibraryName = useDebounce(
        event.queryParams.libraryName,
        Constant.DEBOUNCE_DELAY
    )

    const getLibraries = async () => {
        try {
            const resp = await LibraryService.getLibraries(event.queryParams)
            if (resp.data.success) {
                updateEvent({ libraries: resp.data.data })
            }
        } catch {}
    }

    useEffect(() => {
        getLibraries()
    }, [event.queryParams.cityId, debouncedLibraryName])
    console.log('event == ', event.queryParams.libraryName)
    return (
        <Container>
            <BaseCard cardClass="">
                <div className="w-full grid grid-cols-4  gap-4 mb-4">
                    <div className="flex justify-between gap-2 flex-col">
                        <Label>City</Label>
                        <Select
                            onValueChange={(value) => {
                                updateEvent({
                                    queryParams: {
                                        ...event.queryParams,
                                        cityId: value,
                                    },
                                })
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="City" />
                            </SelectTrigger>
                            <SelectContent>
                                {misc.cities.length > 0 ? (
                                    misc.cities.map((city) => (
                                        <SelectItem
                                            key={city.id}
                                            value={String(city.id)}
                                        >
                                            {city.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem
                                        key="cityNotFound"
                                        value="cityNotFound"
                                    >
                                        No record found
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between gap-2 flex-col">
                        <Label>Search Library</Label>
                        <Input
                            placeholder="Library Name"
                            onChange={(e) => {
                                updateEvent({
                                    queryParams: {
                                        ...event.queryParams,
                                        libraryName: e.target.value,
                                    },
                                })
                            }}
                        />
                    </div>
                </div>
                <h2 className="mb-2 font-medium">Libraries</h2>
                <div className="w-full grid grid-cols-5 gap-4 ">
                    {event.libraries.length > 0 ? (
                        event.libraries.map((value) => (
                            <LibraryItem
                                key={value.id}
                                libraryId={value.id}
                                libraryName={value.libraryName}
                            />
                        ))
                    ) : (
                        <p>No Library Found</p>
                    )}
                </div>
            </BaseCard>
        </Container>
    )
}

const LibraryItem = ({
    libraryName,
    libraryId,
}: {
    libraryName: string
    libraryId: number
}) => {
    return (
        <Link
            href={`/booking/library/${libraryId}`}
            className="shadow-md w-full pt-11 pb-11 px-5 cursor-pointer rounded-[12px]
                       bg-purple-950 transition-all duration-300
                       hover:scale-105 hover:shadow-2xl hover:bg-purple-900/95
                       hover:ring-2 hover:ring-purple-800 hover:-translate-y-1 flex justify-center items-center flex-col"
        >
            <Library size={40} color="white" />
            <span className="text-white font-medium text-md text-center">
                {libraryName}
            </span>
        </Link>
    )
}
