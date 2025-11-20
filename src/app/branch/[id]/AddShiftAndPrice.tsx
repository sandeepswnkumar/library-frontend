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
import Image from 'next/image'
import LibraryService from '@/services/LibraryService'
import { IndianRupee } from 'lucide-react'

type AddShiftAndPricePropsType = {
    id: string
    roomTypes: { id: number; roomType: string }
}

const AddShiftAndPrice = ({ libraryLocation }: AddShiftAndPricePropsType) => {
    const [open, setOpen] = useState<boolean>(false)
    const formSchema = z.object({
        libraryName: z.string().min(2, {
            message: 'Library name must be at least 2 characters.',
        }),
        libraryId: z.number().min(1, {
            message: 'Please select a library.',
        }),
        libraryLocationId: z.number().min(1, {
            message: 'Please select a branch.',
        }),
        name: z.string().min(2, {
            message: 'Facility Name must be at least 2 characters.',
        }),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libraryName: '',
            libraryId: 0,
            libraryLocationId: 0,
            name: '',
            description: '',
            imageUrl: '',
        },
    })

    useEffect(() => {
        form.reset({
            libraryLocationId: 0,
            name: '',
            description: '',
            imageUrl: '',
        })
    }, [])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const resp = await LibraryService.createLibraryFacility(values)
            if (resp.data.success) {
                setOpen(false)
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
                                        name="roomTypeId"
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
                                                            {libraryLocation
                                                                .roomType
                                                                .length > 0 ? (
                                                                libraryLocation.roomType.map(
                                                                    (roomType: {
                                                                        id: number
                                                                        roomType: string
                                                                    }) => {
                                                                        return (
                                                                            <SelectItem
                                                                                key={
                                                                                    location.id
                                                                                }
                                                                                value={String(
                                                                                    location.id
                                                                                )}
                                                                            >
                                                                                {
                                                                                    location.locationName
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
                                        name="start_time"
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
                                        name="end_time"
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
                                        name="price"
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
