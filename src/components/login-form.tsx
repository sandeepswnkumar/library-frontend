'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import BaseCard from './Custom/BaseCard'
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
import Link from 'next/link'
import AuthService from '@/services/AuthService'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { setUser } from '@/lib/features/auth/AuthSlice'

type LoginFormProps = React.ComponentProps<'div'> & {
    setAuthTab?: (tab: string) => void
}

export function LoginForm({ className, setAuthTab, ...props }: LoginFormProps) {
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
        phone: z.string().min(2, {
            message: 'Phone is required',
        }),
        mpin: z.string().min(2, {
            message: 'MPIN is required',
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: '',
            mpin: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const resp = await AuthService.userLogin(values)
            if (resp.data.success) {
                window.localStorage.setItem('_token', resp.data.data.token)
                dispatch(setUser(resp.data.data))
            }
        } catch (err) {}
    }

    const handleSaveClick = () => {
        if (formRef.current) {
            formRef.current?.requestSubmit?.()
        }
    }
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <BaseCard>
                <Form {...form}>
                    <form
                        ref={formRef}
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="phone">
                                            Phone
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="phone"
                                                type="tel"
                                                placeholder="99xxxxxxxx"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-2 ">
                                <FormField
                                    control={form.control}
                                    name="mpin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="phone">
                                                MPIN
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    id="mpin"
                                                    type="password"
                                                    placeholder="****"
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Link
                                    className="w-full text-right hover:underline text-sm"
                                    href={'/forget-mpin'}
                                >
                                    Forgot MPIN ?
                                </Link>
                            </div>
                            <Button type="submit" className="cursor-pointer">
                                Login
                            </Button>
                        </div>
                    </form>
                </Form>
            </BaseCard>
        </div>
    )
}
