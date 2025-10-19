'use client'
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

export default function EditLibraryLocation() {
    const formRef = useRef<HTMLFormElement | null>(null)
    const formSchema = z.object({
        libraryName: z.string().min(2, {
            message: 'Library name must be at least 2 characters.',
        }),
        libraryId: z.string().min(1, {
            message: 'Please select a status.',
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
        cityId: z.string().min(2, {
            message: 'City is required',
        }),
        stateId: z.string().min(2, {
            message: 'State is required',
        }),
        countryId: z.string().min(2, {
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
            libraryName: '',
            libraryId: '',
            email: '',
            phone: '',
            address1: '',
            address2: '',
            cityId: '',
            stateId: '',
            countryId: '',
            pincode: '',
            latitude: '',
            longitude: '',
            mapUrl: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const handleSaveClick = () => {
        if (formRef.current) {
            formRef.current?.requestSubmit?.()
        }
    }
    return (
        <Container>
            <SubHeaderCard>
                <div>
                    <h2 className="font-bold uppercase text-muted-foreground">
                        Edit Libaray Location
                    </h2>
                </div>
                <div>
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
                            <div className="grid grid-cols-4 gap-6">
                                <FormField
                                    control={form.control}
                                    name="libraryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Library</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Library"
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
                                                    placeholder="Email"
                                                    {...field}
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
                                                <Select {...field}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="City" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">
                                                            Light
                                                        </SelectItem>
                                                        <SelectItem value="dark">
                                                            Dark
                                                        </SelectItem>
                                                        <SelectItem value="system">
                                                            System
                                                        </SelectItem>
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
                                                <Select {...field}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="State" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">
                                                            Light
                                                        </SelectItem>
                                                        <SelectItem value="dark">
                                                            Dark
                                                        </SelectItem>
                                                        <SelectItem value="system">
                                                            System
                                                        </SelectItem>
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
                                                <Select {...field}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Country" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">
                                                            Light
                                                        </SelectItem>
                                                        <SelectItem value="dark">
                                                            Dark
                                                        </SelectItem>
                                                        <SelectItem value="system">
                                                            System
                                                        </SelectItem>
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
                        <BaseCard
                            cardTitle="Location Map"
                            cardContentClass="pt-1"
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
                    </form>
                </Form>
            </div>
        </Container>
    )
}
