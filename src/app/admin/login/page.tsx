'use client'
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
import { useEffect, useRef } from 'react'
import AuthService from '@/services/AuthService'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setUser } from '@/lib/features/auth/AuthSlice'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Custom/Loader'

export default function AdminLogin() {
    const formRef = useRef<HTMLFormElement | null>(null)
    const dispatch = useAppDispatch()
    const auth = useAppSelector((state) => state.auth)
    const router = useRouter()
    useEffect(() => {
        if (auth && auth?.isAuthenticated) {
            console.log('user loggedin')
            router.push('/')
        }
    }, [auth, router])
    const formSchema = z.object({
        email: z.string().min(2, {
            message: 'Email is required',
        }),
        password: z.string().min(2, {
            message: 'Password is required',
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try {
            const resp = await AuthService.adminLogin(values)
            window.localStorage.setItem('_token', resp.data.data.token)
            dispatch(setUser(resp.data.data))
        } catch (err) {
            console.log('err', err)
        }
    }

    return (
        <div className="flex w-screen h-screen">
            <div className="grid grid-cols-8 w-full h-full">
                <Form {...form}>
                    <form
                        ref={formRef}
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="col-span-2 flex flex-col justify-center items-center w-full h-full"
                    >
                        <div className="h-full flex flex-col justify-center items-center w-70 gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full mx-auto">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full"
                                                placeholder="xyz@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="w-full flex flex-col justify-end items-end">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="w-full mx-auto">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=""
                                                    placeholder="*********"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <a
                                    href="#"
                                    className="text-left mt-1 text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Button type="submit" className="w-full mx-auto">
                                login
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="bg-green-500 col-span-6">image</div>
            </div>
        </div>
    )
}
