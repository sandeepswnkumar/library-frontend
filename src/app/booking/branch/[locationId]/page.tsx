'use client'
import BaseCard from '@/components/Custom/BaseCard'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React, { useEffect, useReducer } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useAppSelector } from '@/lib/hooks'
import { CheckIcon, ChevronsUpDownIcon, Library } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { useParams } from 'next/navigation'
import LibraryLocationService from '@/services/LibraryLocationService'
import LibraryFacilityItem from '@/components/Custom/LibraryFacilityItem'
import PricingTable from '@/components/Custom/PricingTable'

export default function LocationDetail() {
    const { locationId }: { locationId: string } = useParams()
    const misc = useAppSelector((state) => state.misc)

    const [event, updateEvent] = useReducer(
        (prev, next) => {
            return { ...prev, ...next }
        },
        {
            libraryLocation: {},
        }
    )

    const getLibraryLocationDetails = async () => {
        try {
            const resp = await LibraryLocationService.getLibraryLocation(
                Number(locationId)
            )
            if (resp.data.success) {
                updateEvent({ libraryLocation: resp.data.data })
            }
        } catch {}
    }
    useEffect(() => {
        getLibraryLocationDetails()
    }, [locationId])

    if (!event.libraryLocation?.library) {
        return null
    }
    // conso
    return (
        <Container>
            <SubHeaderCard>
                <h2 className="font-bold uppercase text-muted-foreground">
                    Library Details
                </h2>
                <div className="flex  gap-2">
                    {event.libraryLocation && (
                        <Link
                            href={`/booking/user-booking/${event.libraryLocation.id}`}
                            target='_blank'
                        >
                            <Button>Book Now</Button>
                        </Link>
                    )}
                </div>
            </SubHeaderCard>
            <div className=" flex w-full flex-col gap-4">
                <div className="flex w-full gap-4">
                    <BaseCard
                        cardClass="w-1/2"
                        cardTitle="Library Information"
                        cardContentClass="py-1"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <span className="text-xl font-bold">
                                    {event.libraryLocation.library.libraryName}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <span>Branch : </span>
                                <span className="font-medium">
                                    {event.libraryLocation.locationName}
                                </span>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <div className="flex flex-col">
                                    <span>
                                        {event.libraryLocation.address1}
                                    </span>
                                    <span>
                                        {event.libraryLocation.address2}
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    <span>
                                        {event.libraryLocation.city.name},
                                    </span>
                                    <span>
                                        {event.libraryLocation.state.name},
                                    </span>
                                    <span>
                                        {event.libraryLocation.country.name}
                                    </span>
                                </div>
                                <div>
                                    <span>Pin Code : </span>
                                    <span>{event.libraryLocation.pincode}</span>
                                </div>
                                <div>
                                    <span>Phone : </span>
                                    <span>
                                        {
                                            event.libraryLocation.country
                                                .phonecode
                                        }{' '}
                                        {event.libraryLocation.phone}
                                    </span>
                                </div>
                                <div>
                                    <span>Email : </span>
                                    <span>{event.libraryLocation.email}</span>
                                </div>
                            </div>
                        </div>
                    </BaseCard>
                    <BaseCard
                        cardClass="w-1/2"
                        cardTitle="Library Image"
                        cardContentClass="py-1"
                    >
                        {/* <div className=" flex overflow-hidden">
                            <div className="h-[200px] w-[300px] bg-red-400 ">
                                dsd
                            </div>
                            <div className="h-[200px] w-[300px] bg-red-400 ">
                                dsd
                            </div>
                            <div className="h-[200px] w-[300px] bg-red-400 ">
                                dsd
                            </div>
                            <div className="h-[200px] w-[300px] bg-red-400 ">
                                dsd
                            </div>
                            <div className="h-[200px] w-[300px] bg-red-400 ">
                                dsd
                            </div>
                            <div className="h-[200px] w-[300px] bg-red-400 ">
                                dsd
                            </div>
                        </div> */}
                    </BaseCard>
                </div>
                <div className="flex gap-4">
                    <BaseCard
                        cardClass="min-h-40"
                        cardTitle="Library Facilities"
                        cardContentClass="pt-1 mt-0"
                    >
                        <div className="grid grid-cols-4 gap-3 w-full">
                            {(
                                event.libraryLocation?.libraryFacilities || []
                            ).map(
                                (
                                    facilites: {
                                        id: number
                                        facility: {
                                            id: number
                                            name: string
                                            imageUrl: string
                                        }
                                    },
                                    idx: number
                                ) => (
                                    <LibraryFacilityItem
                                        facilites={facilites}
                                        idx={idx}
                                    />
                                )
                            )}
                        </div>
                    </BaseCard>
                    <BaseCard
                        cardClass="min-h-40"
                        cardTitle="Pricing"
                        cardContentClass="py-1"
                    >
                        <PricingTable
                            libraryShifts={
                                event.libraryLocation?.libraryShifts || []
                            }
                        />
                    </BaseCard>
                </div>
                <BaseCard
                    cardClass="min-h-40"
                    cardTitle="Map"
                    cardContentClass="py-1"
                ></BaseCard>
            </div>
        </Container>
    )
}

const libraryImageAccordian = () => {}

// const LibraryLocation = () => {
//     return (
//         <Link
//             href={'/booking/branch/1'}
//             className="shadow-md w-full pt-11 pb-11 cursor-pointer rounded-[12px]
//                        bg-purple-950 transition-all duration-300
//                        hover:scale-105 hover:shadow-2xl hover:bg-purple-900/95
//                        hover:ring-2 hover:ring-purple-800 hover:-translate-y-1 flex justify-center items-center flex-col"
//         >
//             <Library size={40} color="white" />
//             <span className="text-white font-medium text-lg">Library name</span>
//         </Link>
//     )
// }
