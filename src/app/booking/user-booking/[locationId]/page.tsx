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
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import BookingService from '@/services/BookingService'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { IndianRupee } from 'lucide-react'
import LibraryLocationService from '@/services/LibraryLocationService'
import userTypeEnum from '@/Enums/UserTypeEnum'

export default function UserBooking() {
    const auth = useAppSelector((state) => state.auth)
    const { locationId } = useParams()
    const formSchema = z.object({
        libraryName: z.string(),
        libraryId: z.string().min(2, {
            message: 'Library name must be at least 2 characters.',
        }),
        libraryLocationId: z.string().min(2, {
            message: 'Branch must be at least 2 characters.',
        }),
        locationName: z.string(),
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
        shiftPeriod: z.string(),
    })
    const [event, updateEvent] = useReducer(
        (prev, next) => {
            return { ...prev, ...next }
        },
        {
            libraryLocation: null,
            libraryStatus: [],
            libraryTypes: [],
        }
    )
    const formRef = useRef<HTMLFormElement | null>(null)
    const libraryState = useAppSelector((state) => state.library)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libraryId: '',
            libraryName: '',
            libraryLocationId: '',
            locationName: '',
            roomType: '',
            unit: '',
            noOfUnit: 0,
            shiftPeriod: '',
        },
    })

    useEffect(() => {
        updateEvent({
            libraryStatus: libraryState.status,
            libraryTypes: libraryState.types,
        })
    }, [libraryState])
    
    if (event.libraryLocation) {
        console.log(
            'period  ==== ',
            event.libraryLocation?.libraryShifts.filter(
                (value) =>
                    value.libraryBookingUnitId == form.getValues('unit') &&
                    value.libraryRoomTypeId == form.getValues('roomType')
            )
        )
    }
    const getLibraryDetails = async () => {
        try {
            const resp = await LibraryLocationService.getLibraryLocation(
                Number(locationId)
            )
            if (resp.data.success) {
                const libraryLocation = resp.data.data
                updateEvent({ libraryLocation: libraryLocation })
                form.reset({
                    libraryId: String(libraryLocation.libraryId),
                    libraryLocationId: String(libraryLocation.id),
                    libraryName: libraryLocation.library.libraryName,
                    locationName: libraryLocation.locationName,
                    libraryShiftId: 0,
                    roomType: '',
                    unit: '',
                    noOfUnit: 0,
                    startDate: '',
                    startTime: '',
                })
            }
        } catch {}
    }
    useEffect(() => {
        if (locationId) {
            getLibraryDetails()
        }
    }, [locationId])

    const calculatePrice = () => {
        let roomType = form.getValues('roomType')
        let unit = form.getValues('unit')
        let noOfUnit = form.getValues('noOfUnit') || 0
        let priceTable = event.libraryLocation?.libraryShifts || []
        if (unit && roomType && priceTable.length) {
            let selectedShift = priceTable.find((val) => val)
            let totalPrice = 0
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const resp = await BookingService.createBooking(values)
            if (resp.data.success) {
                router.push(`/library/${resp.data.id}`)
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
                                    name="libraryName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Library Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    value={field.value}
                                                    disabled={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="locationName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Branch</FormLabel>
                                            <FormControl>
                                                <Input
                                                    value={field.value}
                                                    disabled={true}
                                                />
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
                                                    onValueChange={(value) => {
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                        calculatePrice()
                                                    }}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Room Type" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        {event.libraryLocation &&
                                                        event.libraryLocation
                                                            .roomTypes.length >
                                                            0 ? (
                                                            event.libraryLocation.roomTypes.map(
                                                                (value) => (
                                                                    <SelectItem
                                                                        key={
                                                                            value.roomType
                                                                        }
                                                                        value={String(
                                                                            value.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            value.roomType
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )
                                                        ) : (
                                                            <SelectItem
                                                                key="RoomTypeNoRecord"
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
                                                    onValueChange={(value) => {
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                    }}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Booking Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {event.libraryLocation &&
                                                        event.libraryLocation
                                                            .libraryBookingUnit
                                                            .length > 0 ? (
                                                            event.libraryLocation.libraryBookingUnit.map(
                                                                (value) => (
                                                                    <SelectItem
                                                                        key={
                                                                            value.bookingUnit
                                                                        }
                                                                        value={String(
                                                                            value.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            value.bookingUnit
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )
                                                        ) : (
                                                            <SelectItem
                                                                key="RoomTypeNoRecord"
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
                                    name="libraryShiftId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Shift Time</FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={String(
                                                        field.value || ''
                                                    )}
                                                    onValueChange={(value) => {
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                        calculatePrice()
                                                    }}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Shift Time" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        {event.libraryLocation &&
                                                        event.libraryLocation
                                                            .roomTypes.length >
                                                            0 ? (
                                                            event.libraryLocation.libraryShifts
                                                                .filter(
                                                                    (value) =>
                                                                        value.libraryBookingUnitId ==
                                                                            form.getValues(
                                                                                'unit'
                                                                            ) &&
                                                                        value.libraryRoomTypeId ==
                                                                            form.getValues(
                                                                                'roomType'
                                                                            )
                                                                )
                                                                .map(
                                                                    (value) => (
                                                                        <SelectItem
                                                                            key={
                                                                                value.id
                                                                            }
                                                                            value={String(
                                                                                value.id
                                                                            )}
                                                                        >
                                                                            {
                                                                                value.period
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )
                                                        ) : (
                                                            <SelectItem
                                                                key="RoomTypeNoRecord"
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
                            </div>
                        </BaseCard>
                        <div className="w-full flex gap-4">
                            {auth?.currentUser?.user &&
                                auth?.currentUser.user.userTypeId ==
                                    userTypeEnum.ADMIN && (
                                    <BaseCard
                                        cardTitle="Seat Selecation"
                                        cardContentClass="pt-1 "
                                    >
                                        <div className="flex flex-wrap justify-around items-start gap-2">
                                            {new Array(500)
                                                .fill('-')
                                                .map((_, i) => (
                                                    <div key={'seat + ' + i}>
                                                        <Label
                                                            htmlFor={
                                                                'r' + (i + 1)
                                                            }
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
                                )}

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
