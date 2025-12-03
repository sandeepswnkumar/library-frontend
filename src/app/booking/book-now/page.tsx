'use client'
import BaseCard from '@/components/Custom/BaseCard'
import Container from '@/components/layout/Container'
import { Label } from '@/components/ui/label'
import React from 'react'
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
import { useAppSelector } from '@/lib/hooks'
import { Library } from 'lucide-react'

const BookNow = () => {
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
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 flex flex-col gap-4"
                >
                    <BaseCard cardClass="">
                        <div className="w-full grid grid-cols-4  gap-4 mb-4">
                            <ChooseLibrary misc={misc} form={form} />
                            <div className="flex justify-between flex-col">
                                <Label>Search Library</Label>
                                <Input placeholder="Library Name" />
                            </div>
                        </div>
                        <h2 className="mb-2 font-medium">Libraries</h2>
                        <div className="w-full grid grid-cols-5 gap-4 ">
                            <LibraryItem />
                            <LibraryItem />
                            <LibraryItem />
                            <LibraryItem />
                        </div>
                    </BaseCard>
                </form>
            </Form>
        </Container>
    )
}

const ChooseLibrary = ({ form, misc }) => {
    return (
        <>
            <FormField
                control={form.control}
                name="cityId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Select
                                {...field}
                                value={field.value ? String(field.value) : ''}
                                onValueChange={(value) =>
                                    field.onChange(Number(value))
                                }
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
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}

const LibraryItem = () => {
    return (
        <div
            className="shadow-md w-full pt-11 pb-11 cursor-pointer rounded-[12px]
                       bg-purple-950 transition-all duration-300
                       hover:scale-105 hover:shadow-2xl hover:bg-purple-900/95
                       hover:ring-2 hover:ring-purple-800 hover:-translate-y-1 flex justify-center items-center flex-col"
        >
            <Library size={40} color="white" />
            <span className="text-white font-medium text-lg">Library name</span>
        </div>
    )
}

export default BookNow
