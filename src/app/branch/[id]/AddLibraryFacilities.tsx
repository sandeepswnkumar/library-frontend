import React, { useEffect, useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import LibraryService from '@/services/LibraryService'
import { useAppSelector } from '@/lib/hooks'
import { facilities } from '@/types/MiscellaneousType'

type LibraryProps = {
    libraryId: number
    libraryLocationId: number
    getLibraryLocation: () => void
}

const AddLibraryFacilities = ({
    libraryId,
    libraryLocationId,
    getLibraryLocation,
}: LibraryProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const misc = useAppSelector((state) => state.misc)
    const formSchema = z.object({
        libraryId: z.number().min(1, {
            message: 'Please select a library.',
        }),
        libraryLocationId: z.number().min(1, {
            message: 'Please select a branch.',
        }),
        facilityId: z.number().min(1, {
            message: 'Please select a facility.',
        }),
        description: z.string().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libraryId: libraryId,
            libraryLocationId: libraryLocationId,
            facilityId: 0,
            description: '',
        },
    })

    useEffect(() => {
        form.reset({
            libraryId: libraryId,
            libraryLocationId: libraryLocationId,
            facilityId: 0,
            description: '',
        })
    }, [])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const resp = await LibraryService.createLibraryFacility(values)
            if (resp.data.success) {
                setOpen(false)
                form.reset({
                    libraryId: libraryId,
                    libraryLocationId: libraryLocationId,
                    facilityId: 0,
                    description: '',
                })
                getLibraryLocation()
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
                Add Library Facilities
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Library Facility</DialogTitle>

                    <div className="max-h-[400px] overflow-auto px-3">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8 mt-4"
                            >
                                <div className="grid  gap-4 mb-4">
                                    <FormField
                                        control={form.control}
                                        name="facilityId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Facility</FormLabel>
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
                                                            <SelectValue placeholder="Facility" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {misc.facilities
                                                                .length > 0 ? (
                                                                misc.facilities.map(
                                                                    (
                                                                        facility: facilities
                                                                    ) => {
                                                                        return (
                                                                            <SelectItem
                                                                                key={
                                                                                    facility.id
                                                                                }
                                                                                value={String(
                                                                                    facility.id
                                                                                )}
                                                                            >
                                                                                {
                                                                                    facility.name
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
                                <div className="grid gap-4  mb-4">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Description"
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

export default AddLibraryFacilities
