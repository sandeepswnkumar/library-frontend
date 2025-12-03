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
import LibraryService from '@/services/LibraryService'
import { IndianRupee } from 'lucide-react'
import { LibraryBookingType } from '@/types/LibraryType'
import { convertTo12Hour } from '@/lib/utils'

// type LibraryRoomType = {
//     id: number
//     roomType: string
// }

// type AddShiftAndPricePropsType = {
//     libraryId: number
//     locationId: number
//     roomtypes: LibraryRoomType[]
//     libraryBookingUnit: LibraryBookingType[]
//     getLibraryLocation: () => void
// }
type LibraryRoomType = {
    id: number
    libraryLocationId: number
    roomType: string
}

type AddShiftAndPriceProps = {
    libraryId: number
    locationId: number
    roomtypes: LibraryRoomType[]
    libraryBookingUnit: LibraryBookingType[]
    getLibraryLocation: () => void
}

const AddShiftAndPrice = ({
    libraryId,
    locationId,
    roomtypes,
    libraryBookingUnit,
    getLibraryLocation,
}: AddShiftAndPriceProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const formSchema = z.object({
        libraryId: z.number(),
        libraryLocationId: z.number(),

        libraryRoomTypeId: z.number().min(1, {
            message: 'Room Type is required',
        }),

        libraryBookingUnitId: z.number().min(1, {
            message: 'Booking Type is required',
        }),

        startTime: z.string().min(2, {
            message: 'Start time is required',
        }),

        endTime: z.string().min(2, {
            message: 'End time is required',
        }),

        rate: z.number().min(0, {
            message: 'Rate is required',
        }),
        period: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libraryId: libraryId,
            libraryLocationId: locationId,
            libraryRoomTypeId: 0, // select default
            libraryBookingUnitId: 0, // select default
            startTime: '',
            endTime: '',
            rate: 0,
            period: '',
        },
    })

    useEffect(() => {
        form.reset({
            libraryId: libraryId,
            libraryLocationId: locationId,
            libraryRoomTypeId: 0,
            libraryBookingUnitId: 0,
            startTime: '',
            endTime: '',
            rate: 0,
            period: '',
        })
    }, [form, libraryId, locationId])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log('values', values)
            values['period'] =
                convertTo12Hour(values['startTime']) +
                ' - ' +
                convertTo12Hour(values['endTime'])
            values.rate = Number(values.rate.toFixed(2))
            const resp = await LibraryService.createLibraryShiftAndPrice(values)
            if (resp.data.success) {
                setOpen(false)
                form.reset({
                    libraryId: libraryId,
                    libraryLocationId: locationId,
                    libraryRoomTypeId: 0,
                    libraryBookingUnitId: 0,
                    startTime: '',
                    endTime: '',
                    rate: 0,
                })
                getLibraryLocation?.()
            }
        } catch {}
    }
    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <Button
                variant="outline"
                className="bg-white"
                onClick={() => setOpen(true)}
            >
                Add Shift And Price
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Shift And Price</DialogTitle>

                    <div className="max-h-[400px] overflow-auto px-3">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8 mt-4"
                            >
                                <div className="grid gap-4 mb-4">
                                    <FormField
                                        control={form.control}
                                        name="libraryRoomTypeId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Room Type</FormLabel>
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
                                                            <SelectValue placeholder="Room Type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {roomtypes.length >
                                                            0 ? (
                                                                roomtypes.map(
                                                                    (
                                                                        roomType: LibraryRoomType
                                                                    ) => {
                                                                        return (
                                                                            <SelectItem
                                                                                key={String(
                                                                                    roomType.id
                                                                                )}
                                                                                value={String(
                                                                                    roomType.id
                                                                                )}
                                                                            >
                                                                                {
                                                                                    roomType.roomType
                                                                                }
                                                                            </SelectItem>
                                                                        )
                                                                    }
                                                                )
                                                            ) : (
                                                                <SelectItem
                                                                    value="LocationNotFound"
                                                                    key="LocationNotFound"
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
                                        name="libraryBookingUnitId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Booking Type
                                                </FormLabel>
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
                                                            <SelectValue placeholder="Booking Type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {libraryBookingUnit.length >
                                                            0 ? (
                                                                libraryBookingUnit.map(
                                                                    (bookingUnit: {
                                                                        id?: string
                                                                        bookingUnit: string
                                                                    }) => {
                                                                        return (
                                                                            <SelectItem
                                                                                key={String(
                                                                                    bookingUnit.id
                                                                                )}
                                                                                value={String(
                                                                                    bookingUnit.id
                                                                                )}
                                                                            >
                                                                                {
                                                                                    bookingUnit.bookingUnit
                                                                                }
                                                                            </SelectItem>
                                                                        )
                                                                    }
                                                                )
                                                            ) : (
                                                                <SelectItem
                                                                    value="LocationNotFound"
                                                                    key="LocationNotFound"
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
                                </div>
                                <div className="grid lg:grid-cols-2 gap-4  mb-4">
                                    <FormField
                                        control={form.control}
                                        name="startTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Shift Start Time
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="time"
                                                        placeholder="Shift Start Time"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="endTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Shift End Time
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="time"
                                                        placeholder="Shift End Time"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid ">
                                    <FormField
                                        control={form.control}
                                        name="rate"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2">
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-1">
                                                        <IndianRupee
                                                            size={20}
                                                        />
                                                        <Input
                                                            placeholder="Price"
                                                            className=""
                                                            {...field}
                                                        />
                                                    </div>
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

export default AddShiftAndPrice
