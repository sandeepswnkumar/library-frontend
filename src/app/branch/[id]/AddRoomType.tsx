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
import { RoomType } from '@/types/MiscellaneousType'

type AddRoomTypePropsType = {
    libraryId: number
    locationId: number
    getLibraryLocation: () => void
}

const AddRoomType = ({ libraryId, locationId, getLibraryLocation }: AddRoomTypePropsType) => {
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
        roomType: z.string().min(2, {
            message: 'Facility Name must be at least 2 characters.',
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libraryId: libraryId,
            libraryLocationId: locationId,
            roomType: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const resp = await LibraryService.createLibraryRoomType(values)
            if (resp.data.success) {
                setOpen(false)
                form.reset({
                    libraryId: libraryId,
                    libraryLocationId: locationId,
                    roomType: '',
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
                Add Room Type
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Room Type</DialogTitle>

                    <div className="max-h-[400px] overflow-auto px-3">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8 mt-4"
                            >
                                <div className=" mb-4">
                                    <FormField
                                        control={form.control}
                                        name="roomType"
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
                                                                value
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Room Type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {misc.roomType
                                                                .length > 0 ? (
                                                                misc.roomType.map(
                                                                    (
                                                                        roomType: RoomType
                                                                    ) => {
                                                                        return (
                                                                            <SelectItem
                                                                                key={
                                                                                    roomType.name
                                                                                }
                                                                                value={String(
                                                                                    roomType.name
                                                                                )}
                                                                            >
                                                                                {
                                                                                    roomType.name
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

export default AddRoomType
