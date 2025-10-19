import React, { useState } from 'react'
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

const AddLibraryFacilities = () => {
    const [open, setOpen] = useState<boolean>(false)
    const formSchema = z.object({
        libraryName: z.string().min(2, {
            message: 'Library name must be at least 2 characters.',
        }),
        libraryId: z.string().min(1, {
            message: 'Please select a status.',
        }),
        libraryLocationId: z.string().min(1, {
            message: 'Please select a status.',
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
            libraryId: '',
            libraryLocationId: '',
            name: '',
            description: '',
            imageUrl: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <FormField
                                        control={form.control}
                                        name="libraryLocationId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Library Location
                                                </FormLabel>
                                                <FormControl>
                                                    <Select {...field}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Theme" />
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
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Facility Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Facility Name"
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
                                <div className="grid grid-cols-3 gap-3 justify-between items-center mb-4">
                                    <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2">
                                                <FormLabel>Image URL</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Image URL"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Image
                                        className="w-full h-full border-2 border-purple-600"
                                        src="https://media.istockphoto.com/id/1265024528/photo/no-better-adventure-buddy.webp?a=1&b=1&s=612x612&w=0&k=20&c=tStWgNSFBAGPyu4gfJfDEjqMPDnvgqWUkIPyZYGS090="
                                        alt="Facility Image"
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
