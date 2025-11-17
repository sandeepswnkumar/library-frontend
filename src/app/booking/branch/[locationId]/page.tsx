'use client'
import BaseCard from '@/components/Custom/BaseCard'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'
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

export default function LocationDetail() {
    const misc = useAppSelector((state) => state.misc)
    const formSchema = z.object({
        libraryName: z.string().min(2, {
            message: 'Library name must be at least 2 characters.',
        }),
        libraryId: z.number().min(1, {
            message: 'Please select a status.',
        }),
        locationName: z.string().min(2, {
            message: 'Branch name must be at least 2 characters.',
        }),
        locationId: z.string().min(2, {
            message: 'Location ID must be at least 2 characters.',
        }),
        email: z.string().min(1, {
            message: 'Email is required',
        }),
        phone: z.string().min(2, {
            message: 'Phone is required',
        }),
        address1: z.string().min(2, {
            message: 'Address 1 is required',
        }),
        address2: z.string().optional(),
        cityId: z.number().min(2, {
            message: 'City is required',
        }),
        stateId: z.number().min(2, {
            message: 'State is required',
        }),
        countryId: z.number().min(2, {
            message: 'Country Id is required',
        }),
        pincode: z.string().min(2, {
            message: 'Pincode is required',
        }),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        mapUrl: z.string().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libraryName: '33',
            libraryId: 1,
            locationName: '',
            locationId: '',
            email: '',
            phone: '',
            address1: '',
            address2: '',
            cityId: 0,
            stateId: 0,
            countryId: 0,
            pincode: '',
            latitude: '',
            longitude: '',
            mapUrl: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // try {
        //     const resp = await LibraryLocationService.createLibraryLocation(
        //         values
        //     )
        // } catch {}
    }
    return (
        <Container>
            <SubHeaderCard>
                <h2 className="font-bold uppercase text-muted-foreground">
                    Library Details
                </h2>
                <div className="flex  gap-2">
                    <Link href={'/booking/create?branch=1'}>
                        <Button>Book Now</Button>
                    </Link>
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
                                    Sandeep Library
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <span>Branch : </span>
                                <span className="font-medium">Srinagar</span>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <div className="flex flex-col">
                                    <span>Near Daroga Rai</span>
                                    <span>In front of BSNL Exchange</span>
                                </div>
                                <div className="flex gap-1">
                                    <span>Srinagar,</span>
                                    <span>Siwan,</span>
                                    <span>Bihar,</span>
                                    <span>India</span>
                                </div>
                                <div>
                                    <span>Pin Code : </span>
                                    <span>841226</span>
                                </div>
                                <div>
                                    <span>Phone : </span>
                                    <span>+91 9939779372</span>
                                </div>
                                <div>
                                    <span>Email : </span>
                                    <span>sandeepswnkumar@gmail.com </span>
                                </div>
                            </div>
                        </div>
                    </BaseCard>
                    <BaseCard
                        cardClass='w-1/2'
                        cardTitle="Library Image"
                        cardContentClass="py-1"
                    >
                        <div className=' flex overflow-hidden'>
                            <div className='h-[200px] w-[300px] bg-red-400 '>
dsd
                            </div>
                            <div className='h-[200px] w-[300px] bg-red-400 '>
dsd
                            </div>
                            <div className='h-[200px] w-[300px] bg-red-400 '>
dsd
                            </div>
                            <div className='h-[200px] w-[300px] bg-red-400 '>
dsd
                            </div>
                            <div className='h-[200px] w-[300px] bg-red-400 '>
dsd
                            </div>
                            <div className='h-[200px] w-[300px] bg-red-400 '>
dsd
                            </div>
                        </div>
                    </BaseCard>
                </div>
                <div className="flex gap-4">
                    <BaseCard
                        cardClass="min-h-40"
                        cardTitle="Library Facilities"
                        cardContentClass="py-1"
                    ></BaseCard>
                    <BaseCard
                        cardClass="min-h-40"
                        cardTitle="Pricing"
                        cardContentClass="py-1"
                    ></BaseCard>
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
