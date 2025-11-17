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
import { useEffect, useReducer, useRef, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import LibraryService from '@/services/LibraryService'
import { useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'

export default function CreateLibrary() {
    const [event, updateEvent] = useReducer(
        (prev, next) => {
            return { ...prev, ...next }
        },
        {
            libraryStatus: [],
            libraryTypes: [],
        }
    )
    const formRef = useRef<HTMLFormElement | null>(null)
    const libraryState = useAppSelector((state) => state.library)
    const router = useRouter()
    useEffect(() => {
        updateEvent({
            libraryStatus: libraryState.status,
            libraryTypes: libraryState.types,
        })
    }, [libraryState])
    const formSchema = z.object({
        libraryName: z.string().min(2, {
            message: 'Library name must be at least 2 characters.',
        }),
        dimension: z.number().optional(),
        floor: z.number().optional(),
        capacity: z.number().optional(),
        statusId: z.number().min(1, {
            message: 'Please select a status.',
        }),
        typeId: z.number().min(1, {
            message: 'Please select a type.',
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libraryName: '',
            dimension: 0,
            floor: 0,
            capacity: 0,
            statusId: 20003,
            typeId: 0,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const resp = await LibraryService.createLibrary(values)
            if (resp.data.success) {
                router.push(`/library/${resp.data.data.id}`)
            }
        } catch (err) {}
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
                        Add Libaray
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
                        className="space-y-8"
                    >
                        <BaseCard
                            cardTitle="Basic Information"
                            cardContentClass="pt-1"
                        >
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                                {/* <FormField
                                    control={form.control}
                                    name="statusId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={String(
                                                        field.value || ''
                                                    )}
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        {event.libraryStatus
                                                            .length > 0 ? (
                                                            event.libraryStatus.map(
                                                                (status: {
                                                                    id: number
                                                                    name: string
                                                                }) => (
                                                                    <SelectItem
                                                                        key={
                                                                            status.id
                                                                        }
                                                                        value={String(
                                                                            status.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            status.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )
                                                        ) : (
                                                            <SelectItem
                                                                key="StatusNoRecord"
                                                                value="null"
                                                                disabled={true}
                                                            >
                                                                No Record found
                                                            </SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}
                                <FormField
                                    control={form.control}
                                    name="typeId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={String(
                                                        field.value || ''
                                                    )}
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {event.libraryTypes
                                                            .length > 0 ? (
                                                            event.libraryTypes.map(
                                                                (type: {
                                                                    id: number
                                                                    name: string
                                                                }) => (
                                                                    <SelectItem
                                                                        key={
                                                                            type.id
                                                                        }
                                                                        value={String(
                                                                            type.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            type.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )
                                                        ) : (
                                                            <SelectItem
                                                                key="TypeNoRecord"
                                                                value="null"
                                                                disabled={true}
                                                            >
                                                                No Record found
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
                                    name="dimension"
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
                                                    type="number"
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
                                                    type="number"
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
            </div>
        </Container>
    )
}
