'use client'
import BaseCard from '@/components/Custom/BaseCard'
import Container from '@/components/layout/Container'
import { Label } from '@/components/ui/label'
import React, { useEffect, useReducer } from 'react'
import { Input } from '@/components/ui/input'
import { useAppSelector } from '@/lib/hooks'
import { LocateFixedIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import LibraryLocationService from '@/services/LibraryLocationService'
import LibraryService from '@/services/LibraryService'

export default function ChooseLibraryLocation() {
    const misc = useAppSelector((state) => state.misc)
    const { libraryId }: { libraryId: string } = useParams()
    const [event, updateEvent] = useReducer(
        (prev, next) => {
            return { ...prev, ...next }
        },
        {
            library: {},
            queryParams: {
                branchName: '',
            },
        }
    )

    const getLibraryLocations = async () => {
        try {
            const resp = await LibraryService.getLibrary(libraryId)
            if (resp.data.success) {
                updateEvent({ library: resp.data.data })
            }
        } catch {}
    }

    useEffect(() => {
        if (libraryId) {
            getLibraryLocations()
        }
    }, [libraryId])

    return (
        <Container>
            <BaseCard cardClass="">
                <div className="w-full grid grid-cols-4  gap-4 mb-4">
                    <div className="flex justify-between gap-2 flex-col">
                        <Label>Library</Label>
                        <Input
                            placeholder="Library Name"
                            value={event.library?.libraryName || ''}
                            disabled={true}
                        />
                    </div>
                </div>
                <h2 className="mb-2 font-medium">Library Branch</h2>
                <div className="w-full grid grid-cols-5 gap-4 ">
                    {event.library?.locations &&
                    event.library.locations.length > 0 ? (
                        event.library.locations.map((location) => (
                            <LibraryLocation
                                key={location.id}
                                locationId={location.id}
                                locationName={location.locationName}
                            />
                        ))
                    ) : (
                        <p>No record found</p>
                    )}
                </div>
            </BaseCard>
        </Container>
    )
}

const LibraryLocation = ({
    locationName,
    locationId,
}: {
    locationName: string
    locationId: number
}) => {
    return (
        <Link
            href={`/booking/branch/${locationId}`}
            className="shadow-md w-full pt-11 pb-11 px-5 cursor-pointer rounded-[12px]
                       bg-purple-950 transition-all duration-300
                       hover:scale-105 hover:shadow-2xl hover:bg-purple-900/95
                       hover:ring-2 hover:ring-purple-800 hover:-translate-y-1 flex justify-center items-center flex-col"
        >
            <LocateFixedIcon size={40} color="white" />
            <span className="text-white font-medium text-md text-center">
                {locationName}
            </span>
        </Link>
    )
}
