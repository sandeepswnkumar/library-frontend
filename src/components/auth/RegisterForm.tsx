import { cn } from '@/lib/utils'
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
import { useReducer, useRef } from 'react'
import BaseCard from '../Custom/BaseCard'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import AuthService from '@/services/AuthService'
import { toast } from 'sonner'

type RegisterFormProps = React.ComponentProps<'div'> & {
    setAuthTab?: (tab: string) => void
}

export default function RegisterForm({
    className,
    setAuthTab,
    ...props
}: RegisterFormProps) {
    const [event, updateEvent] = useReducer(
        (prev, next) => {
            return { ...prev, ...next }
        },
        {
            isOTPGenerated: false,
            isOtpCompleted: false,
        }
    )
    const formRef = useRef<HTMLFormElement | null>(null)
    const formSchema = z.object({
        phone: z.string().min(2, {
            message: 'Library name must be at least 2 characters.',
        }),
        otp: z.string().optional(),
        mpin: z.string().optional(),
        confirmMpin: z.string().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: '',
            otp: '',
            mpin: '',
            confirmMpin: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (!event.isOTPGenerated && !event.isOtpCompleted) {
                const resp = await AuthService.userRegister(values)
                if (resp.data.success) {
                    updateEvent({ isOTPGenerated: true })
                }
            } else if (event.isOTPGenerated && !event.isOtpCompleted) {
                const resp = await AuthService.verifyOTP(values)
                if (resp.data.success) {
                    updateEvent({ isOtpCompleted: true })
                }
            } else if (event.isOtpCompleted) {
                const resp = await AuthService.createUserMPIN(values)
                if (resp.data.success) {
                    setAuthTab?.('login')
                }
            } else {
                console.log('Somthing Went wrong')
            }
        } catch (err) {}
    }

    const handleUserRegister = async () => {}

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
                                                placeholder="9956xxxxxx"
                                                disabled={event.isOTPGenerated}
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {event.isOTPGenerated && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="otp"
                                        disabled={event.isOtpCompleted}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="otp">
                                                    OTP
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        id="otp"
                                                        type="password"
                                                        placeholder="****"
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {event.isOtpCompleted && (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="mpin"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel htmlFor="mpin">
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
                                            <FormField
                                                control={form.control}
                                                name="confirmMpin"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel htmlFor="confirmMPin">
                                                            Confirm MPIN
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                id="confirmMPin"
                                                                type="password"
                                                                placeholder="****"
                                                                required
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}
                                </>
                            )}

                            <Button type="submit" className="cursor-pointer">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </BaseCard>
        </div>
    )
}
