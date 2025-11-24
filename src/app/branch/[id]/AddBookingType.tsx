import React, { useEffect, useReducer, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
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
import { useAppSelector } from '@/lib/hooks'
import { BookingUnit } from '@/types/MiscellaneousType'

type AddRoomTypePropsType = {
    libraryId: number
    locationId: number
    getLibraryLocation: () => void
}

const AddBookingType = ({ libraryId, locationId, getLibraryLocation }: AddRoomTypePropsType) => {
    const [open, setOpen] = useState<boolean>(false)
    const misc = useAppSelector((state) => state.misc)
    const [event, updateEvent] = useReducer(
        (prev, next) => {
            return { ...prev, ...next }
        },
        {
            open: false,
        }
    )
    const formSchema = z.object({
        libraryId: z.number(),
        libraryLocationId: z.number(),
        bookingUnit: z.string().min(2, {
            message: 'Facility Name must be at least 2 characters.',
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libraryId: libraryId,
            libraryLocationId: locationId,
            bookingUnit: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const resp = await LibraryService.createLibraryBookingUnit(values)
            if (resp.data.success) {
                setOpen(false)
                form.reset({
                    libraryId: libraryId,
                    libraryLocationId: locationId,
                    bookingUnit: '',
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
                Add Booking Type
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Booking Type</DialogTitle>

                    <div className="max-h-[400px] overflow-auto px-3">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8 mt-4"
                            >
                                <div className=" mb-4">
                                    <FormField
                                        control={form.control}
                                        name="bookingUnit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Booking Type</FormLabel>
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
                                                                value
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Booking Type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {misc.bookingUnit
                                                                .length > 0 ? (
                                                                misc.bookingUnit.map(
                                                                    (
                                                                        bookingUnit: BookingUnit
                                                                    ) => {
                                                                        return (
                                                                            <SelectItem
                                                                                key={
                                                                                    bookingUnit.name
                                                                                }
                                                                                value={String(
                                                                                    bookingUnit.name
                                                                                )}
                                                                            >
                                                                                {
                                                                                    bookingUnit.name
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

export default AddBookingType
