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
import AddLibraryFacilities from './AddLibraryFacilities'
import AddLibraryLocation from './AddLibraryLocation'

export default function EditLibrary() {
    const formRef = useRef<HTMLFormElement | null>(null)
    const formSchema = z.object({
        libraryName: z.string().min(2, {
            message: 'Library name must be at least 2 characters.',
        }),
        diamension: z.string().optional(),
        floor: z.string().optional(),
        capacity: z.string().min(2, {
            message: 'Capacity must be at least 2 characters.',
        }),
        statusId: z.string().min(1, {
            message: 'Please select a status.',
        }),
        typeId: z.string().min(1, {
            message: 'Please select a type.',
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libraryName: '',
            diamension: '',
            floor: '',
            capacity: '',
            statusId: '',
            typeId: '',
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
                        Library Edit
                    </h2>
                </div>
                <div className="flex gap-3">
                    <AddLibraryFacilities />
                    <AddLibraryLocation />
                    <Button onClick={handleSaveClick}>Save</Button>
                </div>
            </SubHeaderCard>
            <div className="flex flex-col gap-3">
                <Form {...form}>
                    <form
                        ref={formRef}
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <BaseCard
                            cardTitle="Basic Information"
                            cardContentClass="pt-1"
                        >
                            <div className="grid grid-cols-4 gap-6">
                                <FormField
                                    control={form.control}
                                    name="libraryName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Library Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Library Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="statusId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
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
                                    name="typeId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
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
                                    name="diamension"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Diamention</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Diamention"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="floor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Floor</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Floor"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="capacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Capacity</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Capacity"
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
                <BaseCard
                    cardTitle="Library Location"
                    cardContentClass="pt-1"
                ></BaseCard>
                <BaseCard
                    cardTitle="Library Facitilies"
                    cardContentClass="pt-1"
                ></BaseCard>
            </div>
        </Container>
    )
}
