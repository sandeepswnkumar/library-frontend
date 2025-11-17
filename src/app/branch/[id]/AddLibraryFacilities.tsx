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

type LibraryProps = {
    libraryId: number
    libraryLocationId: number
}

const AddLibraryFacilities = ({
    libraryId,
    libraryLocationId,
}: LibraryProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const formSchema = z.object({
        libraryId: z.number().min(1, {
            message: 'Please select a library.',
        }),
        libraryLocationId: z.number().min(1, {
            message: 'Please select a branch.',
        }),
        facilityId: z.string(),
        description: z.string().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libraryId: 0,
            libraryLocationId: 0,
            facilityId: '',
            description: '',
        },
    })

    useEffect(() => {
        form.reset({
            libraryId: libraryId,
            libraryLocationId: libraryLocationId,
            facilityId: '',
            description: '',
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
                                                    <Input
                                                        placeholder="Facility"
                                                        {...field}
                                                    />
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
