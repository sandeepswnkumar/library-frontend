'use client'
import { assets } from '@/assets/assets'
import BaseCard from '@/components/Custom/BaseCard'
import Datatable from '@/components/Custom/Datatable'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import BookingService from '@/services/BookingService'
import Link from 'next/link'
import { useEffect, useReducer } from 'react'

export default function Booking() {
    const [event, updateEvent] = useReducer(
        (prev, next) => {
            return { ...prev, ...next }
        },
        {
            bookings: [],
        }
    )

    const getbookings = async () => {
        try {
            const resp = await BookingService.getBookings()
            if (resp.data.success) {
                updateEvent({ bookings: resp.data.data })
            }
        } catch {}
    }

    useEffect(() => {
        getbookings()
    }, [])
    return (
        <Container>
            <SubHeaderCard>
                <h2 className="font-bold uppercase text-muted-foreground">
                    Bookings
                </h2>
                <div className='flex  gap-2'>
                    <Link href={'/booking/create'}>
                        <Button variant={'outline'} className="bg-white">
                            New Booking
                        </Button>
                    </Link>
                    <Link href={'/booking/book-now'}>
                        <Button variant={'outline'} className="bg-white">
                            Book Now
                        </Button>
                    </Link>
                </div>
            </SubHeaderCard>

            <BaseCard>
                <div className="mb-3 flex justify-between">
                    <div>
                        <Input />
                    </div>
                </div>
                <Datatable
                    columns={assets.data.columns.BookingColumns}
                    data={event.bookings}
                    totalCount={0}
                    allCheck={false}
                    setAllCheck={() => {}}
                    rowAction={[
                        { name: 'Edit', type: 'LINK', url: '/booking/' },
                        { name: 'Delete', type: 'DELETE' },
                    ]}
                />
            </BaseCard>
        </Container>
    )
}
