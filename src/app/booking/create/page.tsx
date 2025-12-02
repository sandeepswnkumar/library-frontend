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
import { useEffect, useReducer, useRef } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import BookingService from '@/services/BookingService'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { IndianRupee } from 'lucide-react'

export default function CreateBooking() {
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
        libraryId: z.string().min(2, {
            message: 'Library name must be at least 2 characters.',
        }),
        libraryLocationId: z.string().min(2, {
            message: 'Branch must be at least 2 characters.',
        }),
        roomType: z.string().min(2, {
            message: 'Room Type must be at least 2 characters.',
        }),
        unit: z.string().min(2, {
            message: 'Booking Type must be at least 2 characters.',
        }),
        noOfUnit: z
            .number()
            .lt(1, {
                message: 'No of month will be not be less then 1',
            })
            .gt(12, {
                message: 'No of month will be not be greater then 12',
            }),
        startDate: z.string(),
        startTime: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libraryId: '',
            libraryLocationId: '',
            roomType: '',
            unit: '',
            noOfUnit: 0,
            startDate: '',
            startTime: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const resp = await BookingService.createBooking(values)
            if (resp.data.success) {
                router.push(`/library/${resp.data.id}`)
            }
        } catch (err) {
            console.log(err)
        }
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
                        New Bookings
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
                            cardClass="mb-4"
                            cardTitle="Booking Information"
                            cardContentClass="pt-1"
                        >
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                <FormField
                                    control={form.control}
                                    name="libraryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Library Name</FormLabel>
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
                                                        <SelectValue placeholder="Library Name" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        <SelectItem
                                                            key="AC"
                                                            value="AC"
                                                        >
                                                            AC
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
                                    name="libraryLocationId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Branch</FormLabel>
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
                                                        <SelectValue placeholder="Branch" />
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
                                />
                                <FormField
                                    control={form.control}
                                    name="roomType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Room Type</FormLabel>
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
                                                        <SelectValue placeholder="Room Type" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        <SelectItem
                                                            key="AC"
                                                            value="AC"
                                                        >
                                                            AC
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
                                    name="unit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Booking Type</FormLabel>
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
                                                        <SelectValue placeholder="Booking Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem
                                                            key="10"
                                                            value="10"
                                                        >
                                                            Monthly
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
                                    name="noOfUnit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>No Of Month</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="No Of Month"
                                                    min="1"
                                                    max="12"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Date</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    placeholder="Start Date"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="startTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Time</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    placeholder="Start Date"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </BaseCard>
                        <div className="w-full flex gap-4">
                            <BaseCard
                                cardTitle="Seat Selecation"
                                cardContentClass="pt-1 "
                            >
                                <div className="flex flex-wrap justify-around items-start gap-2">
                                    {new Array(500).fill('-').map((_, i) => (
                                        <div key={'seat + ' + i}>
                                            <Label
                                                htmlFor={'r' + (i + 1)}
                                                className=" bg-purple-600 p-2 text-xs min-w-8 min-h-8 text-white rounded-sm border flex justify-center items-center"
                                            >
                                                {'R' + (i + 1)}
                                            </Label>
                                            <Checkbox
                                                id={'r' + (i + 1)}
                                                className="hidden"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </BaseCard>
                            <BaseCard
                                cardTitle="Payment Information"
                                cardContentClass="pt-1 "
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <span>Booking Amount</span>
                                        <span className="flex items-center">
                                            <IndianRupee size={14} />
                                            <span>3540.00</span>
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-purple-600">
                                        <span>Discount (0%)</span>
                                        <span className="flex items-center">
                                            -<IndianRupee size={14} />
                                            <span>00.00</span>
                                        </span>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between">
                                        <span>Total Amount</span>
                                        <span className="flex items-center">
                                            <IndianRupee size={14} />
                                            <span>3540.00</span>
                                        </span>
                                    </div>
                                </div>
                            </BaseCard>
                        </div>
                    </form>
                </Form>
            </div>
        </Container>
    )
}
