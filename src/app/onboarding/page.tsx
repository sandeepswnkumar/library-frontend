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
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import UserService from '@/services/UserService'
import { setUser } from '@/lib/features/auth/AuthSlice'

export default function CreateLibrary() {
    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const router = useRouter()
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

    const formSchema = z.object({
        firstName: z.string().min(2, {
            message: 'First Name must be at least 2 characters.',
        }),
        middleName: z.string().optional(),
        lastName: z.string().min(2, {
            message: 'Last Name must be at least 2 characters.',
        }),
        email: z.email({
            message: 'Email is required.',
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const userId = (auth?.currentUser as { id: string })?.id ?? ''
            const resp = await UserService.updateUser(userId, values)
            console.log('resp.data.data', resp.data.data)
            if (resp.data.success) {
                dispatch(setUser(resp.data.data))
                router.push(`/`)
            }
        } catch (err) {}
    }

    const handleSaveClick = () => {
        if (formRef.current) {
            formRef.current?.requestSubmit?.()
        }
    }
    return (
        <div className="h-screen w-screen ">
            <Form {...form}>
                <form
                    ref={formRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex justify-center items-center h-full w-full "
                >
                    <BaseCard
                        cardClass="w-full lg:w-2xl max-w-2xl"
                        cardTitle="Onboarding"
                        cardContentClass="pt-1"
                    >
                        <div className="grid lg:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="First Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="middleName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Middle Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Middle Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Last Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                        </div>
                        <div className="w-full flex justify-center items-center mt-6">
                            <Button type="submit">Save</Button>
                        </div>
                    </BaseCard>
                </form>
            </Form>
        </div>
    )
}
