'use client'
import React, { useEffect, useReducer } from 'react'
import BaseCard from '@/components/Custom/BaseCard'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
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
import { useRef } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useAppSelector } from '@/lib/hooks'
import { Trash2 } from 'lucide-react'

import LibraryLocationService from '@/services/LibraryLocationService'
import { useParams } from 'next/navigation'
import { LibraryLocation } from '@/types/LibraryLocation'
import AddRoomType from './AddRoomType'
import AddShiftAndPrice from './AddShiftAndPrice'
import AddLibraryFacilities from './AddLibraryFacilities'
import SearchableSelect from '@/components/Custom/SearchableSelect'
import SearchableSelectAPI from '@/components/Custom/SearchableSelectAPI'
import LibraryService from '@/services/LibraryService'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import AddBookingType from './AddBookingType'
import LibraryFacilityItem from '@/components/Custom/LibraryFacilityItem'
import PricingTable from '@/components/Custom/PricingTable'

const frameworks = [
    {
        value: 'next.js',
        label: 'Next.js',
    },
    {
        value: 'sveltekit',
        label: 'SvelteKit',
    },
    {
        value: 'nuxt.js',
        label: 'Nuxt.js',
    },
    {
        value: 'remix',
        label: 'Remix',
    },
    {
        value: 'astro',
        label: 'Astro',
    },
]

type LibraryLocationData = {
    [key: string | number]: LibraryLocation
}

type LibraryEventState = {
    libraryLocation: LibraryLocationData | null
    libraries: []
}

export default function EditLibraryLocation() {
    const { id } = useParams()
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')
    const formRef = useRef<HTMLFormElement | null>(null)
    const misc = useAppSelector((state) => state.misc)

    const [event, updateEvent] = useReducer(
        (prev: LibraryEventState, next: Partial<LibraryEventState>) => {
            return { ...prev, ...next }
        },
        {
            libraries: [],
            libraryLocation: null,
        } as LibraryEventState
    )
    const formSchema = z.object({
        libraryName: z.string().min(2, {
            message: 'Library name must be at least 2 characters.',
        }),
        libraryId: z.number().min(1, {
            message: 'Please select a status.',
        }),
        locationName: z.string().min(2, {
            message: 'Branch must be at least 2 characters.',
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

    const getLibraryLocation = async () => {
        try {
            const resp = await LibraryLocationService.getLibraryLocation(
                Number(id)
            )
            if (resp.data.success) {
                updateEvent({ libraryLocation: resp.data.data })
                const {
                    library,
                    locationName,
                    email,
                    phone,
                    address1,
                    address2,
                    cityId,
                    stateId,
                    countryId,
                    pincode,
                    latitude,
                    longitude,
                    mapUrl,
                } = resp.data.data
                form.reset({
                    libraryName: library.libraryName,
                    libraryId: library.id,
                    locationName,
                    email,
                    phone,
                    address1,
                    address2,
                    cityId,
                    stateId,
                    countryId,
                    pincode,
                    latitude,
                    longitude,
                    mapUrl,
                })
            }
        } catch {}
    }

    useEffect(() => {
        if (misc.cities.length) {
            getLibraryLocation()
        }
        getLibrary()
    }, [misc])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const resp = await LibraryLocationService.updateLibraryLocation(
                Number(id),
                values
            )
        } catch {}
    }

    const handleSaveClick = () => {
        if (formRef.current) {
            formRef.current?.requestSubmit?.()
        }
    }

    const getLibrary = async () => {
        try {
            const resp = await LibraryService.getLibraries()
            if (resp.data.success) {
                updateEvent({ libraries: resp.data.data })
            }
        } catch {}
    }
    return (
        <Container>
            <SubHeaderCard>
                <h2 className="font-bold uppercase text-muted-foreground">
                    Edit Branch
                </h2>
                <div className="gap-2 flex flex-wrap">
                    {event.libraryLocation && (
                        <AddLibraryFacilities
                            libraryId={Number(event.libraryLocation.libraryId)}
                            libraryLocationId={Number(event.libraryLocation.id)}
                            getLibraryLocation={getLibraryLocation}
                        />
                    )}
                    {event.libraryLocation && (
                        <AddRoomType
                            libraryId={Number(event.libraryLocation.libraryId)}
                            locationId={Number(event.libraryLocation.id)}
                            getLibraryLocation={getLibraryLocation}
                        />
                    )}
                    {event.libraryLocation && (
                        <AddBookingType
                            libraryId={Number(event.libraryLocation.libraryId)}
                            locationId={Number(event.libraryLocation.id)}
                            getLibraryLocation={getLibraryLocation}
                        />
                    )}

                    {event.libraryLocation && (
                        <AddShiftAndPrice
                            libraryId={event.libraryLocation.libraryId}
                            locationId={event.libraryLocation.id}
                            getLibraryLocation={getLibraryLocation}
                            roomtypes={event.libraryLocation.roomTypes}
                            libraryBookingUnit={
                                event.libraryLocation.libraryBookingUnit
                            }
                        />
                    )}

                    <Button onClick={handleSaveClick}>Save</Button>
                </div>
            </SubHeaderCard>
            <div className="flex flex-col gap-3">
                <Form {...form}>
                    <form
                        ref={formRef}
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 flex flex-col gap-4"
                    >
                        <BaseCard
                            cardTitle="Basic Information"
                            cardClass="mb-0"
                            cardContentClass="pt-1"
                        >
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                <FormField
                                    control={form.control}
                                    name="libraryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Library</FormLabel>
                                            <FormControl>
                                                <Input
                                                    value={
                                                        event.libraryLocation
                                                            ?.library
                                                            ?.libraryName || ''
                                                    }
                                                    placeholder="Library Name"
                                                    disabled={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="locationName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Branch</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Branch"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Email"
                                                    disabled={true}
                                                    onChange={() => null}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Phone"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address 1</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Address 1"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address 2</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Address 2"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="cityId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={
                                                        field.value
                                                            ? String(
                                                                  field.value
                                                              )
                                                            : ''
                                                    }
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="City" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {misc.cities.length >
                                                        0 ? (
                                                            misc.cities.map(
                                                                (city) => (
                                                                    <SelectItem
                                                                        key={
                                                                            city.id
                                                                        }
                                                                        value={String(
                                                                            city.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            city.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )
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
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="stateId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={
                                                        field.value
                                                            ? String(
                                                                  field.value
                                                              )
                                                            : ''
                                                    }
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="State" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {misc.states.length ? (
                                                            misc.states.map(
                                                                (state) => (
                                                                    <SelectItem
                                                                        key={
                                                                            state.id
                                                                        }
                                                                        value={String(
                                                                            state.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            state.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )
                                                        ) : (
                                                            <SelectItem
                                                                key="stateFoundFound"
                                                                value="stateNotFound"
                                                            >
                                                                No record found
                                                            </SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="countryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={
                                                        field.value
                                                            ? String(
                                                                  field.value
                                                              )
                                                            : ''
                                                    }
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Country" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {misc.country.length ? (
                                                            misc.country.map(
                                                                (cont) => (
                                                                    <SelectItem
                                                                        key={
                                                                            cont.id
                                                                        }
                                                                        value={String(
                                                                            cont.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            cont.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )
                                                        ) : (
                                                            <SelectItem
                                                                key="countryNotFound"
                                                                value="countryNotFound"
                                                            >
                                                                No record found
                                                            </SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="pincode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pincode</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Pincode"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="latitude"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Latitude</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Latitude"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="longitude"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Longitude</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Longitude"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </BaseCard>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-0">
                            <div className=" lg:col-span-2 grid grid-cols-2 gap-4 mb-0">
                                <BaseCard
                                    cardTitle="Room Type"
                                    cardClass=" mb-0"
                                    cardContentClass="pt-1 mb-0"
                                >
                                    {event.libraryLocation?.roomTypes && (
                                        <div className="flex flex-wrap gap-3">
                                            {event.libraryLocation.roomTypes.map(
                                                (roomType: {
                                                    id: number
                                                    roomType: string
                                                }) => (
                                                    <div className=" bg-purple-700 rounded-xs text-sm text-white flex items-center gap-2">
                                                        <span className="px-3 py-2 border border-transparent">
                                                            {roomType.roomType}
                                                        </span>{' '}
                                                        <Trash2
                                                            size={15}
                                                            className="text-red-500 px-2 cursor-pointer bg-white h-full w-full border border-purple-700 hover:bg-red-500 hover:text-white"
                                                            onClick={async () => {
                                                                try {
                                                                    const resp =
                                                                        await LibraryLocationService.deleteLibraryRoomType(
                                                                            String(
                                                                                roomType.id
                                                                            )
                                                                        )
                                                                    if (
                                                                        resp
                                                                            .data
                                                                            .success
                                                                    ) {
                                                                        getLibraryLocation()
                                                                    }
                                                                } catch {}
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </BaseCard>
                                <BaseCard
                                    cardTitle="Booking Type"
                                    cardClass=" mb-0"
                                    cardContentClass="pt-1 mb-0"
                                    // headerButton={[
                                    //     {
                                    //         type: 'ADD',
                                    //         subType : 'MODAL',
                                    //         action : <AddRoomType />
                                    //     },
                                    // ]}
                                >
                                    {event.libraryLocation
                                        ?.libraryBookingUnit && (
                                        <div className="flex flex-wrap gap-3">
                                            {event.libraryLocation.libraryBookingUnit.map(
                                                (bookingUnit: {
                                                    id: number
                                                    bookingUnit: string
                                                }) => (
                                                    <div className=" bg-purple-700 rounded-xs text-sm text-white flex items-center gap-2">
                                                        <span className="px-3 py-2 border border-transparent">
                                                            {
                                                                bookingUnit.bookingUnit
                                                            }
                                                        </span>{' '}
                                                        <Trash2
                                                            size={15}
                                                            className="text-red-500 px-2 cursor-pointer bg-white h-full w-full border border-purple-700 hover:bg-red-500 hover:text-white"
                                                            onClick={async () => {
                                                                try {
                                                                    const resp =
                                                                        await LibraryLocationService.deleteLibraryBookingUnit(
                                                                            String(
                                                                                bookingUnit.id
                                                                            )
                                                                        )
                                                                    if (
                                                                        resp
                                                                            .data
                                                                            .success
                                                                    ) {
                                                                        getLibraryLocation()
                                                                    }
                                                                } catch {}
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </BaseCard>
                            </div>
                            <div className=" lg:col-span-2">
                                <BaseCard
                                    cardTitle="Shift and Pricing"
                                    cardClass=" mb-0"
                                    cardContentClass="pt-1 mb-0"
                                >
                                    <PricingTable libraryShifts={event.libraryLocation?.libraryShifts || []} />
                                </BaseCard>
                            </div>
                        </div>
                        <div className="flex gap-4 mb-0">
                            <BaseCard
                                cardTitle="Location Map"
                                cardClass=" mb-0"
                                cardContentClass="pt-1 mb-0"
                            >
                                <div className="grid">
                                    <FormField
                                        control={form.control}
                                        name="mapUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Map Url</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Map Url"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </BaseCard>
                            <BaseCard
                                cardTitle="Library Facitilies"
                                cardContentClass="pt-1 mt-0"
                            >
                                <div className="grid grid-cols-4 gap-3 w-full">
                                    {(
                                        event.libraryLocation
                                            ?.libraryFacilities || []
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
                        </div>
                    </form>
                </Form>
            </div>
        </Container>
    )
}
