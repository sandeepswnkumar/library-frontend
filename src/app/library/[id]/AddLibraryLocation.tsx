import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
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
import LibraryService from '@/services/LibraryService'
import LibraryLocationService from '@/services/LibraryLocationService'

type LibraryProps = {
    id: string
    libraryName: string
}

const AddLibraryLocation = ({
    library,
    getLibraryDetail,
}: {
    library: LibraryProps
    getLibraryDetail: () => Promise<any>
}) => {
    const misc = useAppSelector((state) => state.misc)
    const [open, setOpen] = useState<boolean>(false)
    const formSchema = z.object({
        libraryName: z.string().min(2, {
            message: 'Library name must be at least 2 characters.',
        }),
        libraryId: z.number().min(1, {
            message: 'Please select a status.',
        }),
        locationName: z.string().min(1, {
            message: 'Branch name is required',
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
        pincode: z.string().min(6, {
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
            libraryId: 0,
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

    useEffect(() => {
        if (library) {
            form.reset({
                libraryName: library.libraryName,
                libraryId: Number(library.id),
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
            })
        }
        return () => {
            form.reset({
                libraryName: '',
                libraryId: 0,
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
            })
        }
    }, [library])

    // console.log("form === ", form)
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const resp = await LibraryLocationService.createLibraryLocation(
                values
            )
            if (resp.data.success) {
                getLibraryDetail()
                setOpen(false)
            }
        } catch {}
    }

    // function onError(errors, e) {
    //     console.log("library === ", library)
    //     console.log("form === ", form)
    //     const errorKeys = Object.keys(errors)
    //     console.log('errors : ', errors, e)
    // }

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <Button
                variant="outline"
                className="bg-white"
                onClick={() => setOpen(true)}
            >
                Add Library Location
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Library Location</DialogTitle>
                    <div className="max-h-[400px] overflow-auto px-3">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8 mt-4"
                            >
                                <div className="mb-4">
                                    <FormField
                                        control={form.control}
                                        name="locationName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Branch Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Branch Name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
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
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
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
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            field.onChange(
                                                                Number(value)
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="City" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {misc.cities
                                                                .length > 0 ? (
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
                                                                    No record
                                                                    found
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
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            field.onChange(
                                                                Number(value)
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="State" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {misc.states
                                                                .length ? (
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
                                                                    No record
                                                                    found
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
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            field.onChange(
                                                                Number(value)
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Country" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {misc.country
                                                                .length ? (
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
                                                                    No record
                                                                    found
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
                                <div className="mb-3">
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
                                <div className="w-full flex justify-end">
                                    <Button type="submit">Add</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddLibraryLocation
