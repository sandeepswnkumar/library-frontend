import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
import React from 'react'

function ManageBooking() {
    return (
        <Container>
            <SubHeaderCard>
                <h2 className="font-bold uppercase text-muted-foreground">
                    Manage Booking
                </h2>
            </SubHeaderCard>
        </Container>
    )
}

export default ManageBooking
