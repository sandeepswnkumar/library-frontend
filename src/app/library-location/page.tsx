'use client'
import { assets } from '@/assets/assets'
import BaseCard from '@/components/Custom/BaseCard'
import Datatable from '@/components/Custom/Datatable'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LibraryLocationService from '@/services/LibraryLocationService'
import Link from 'next/link'
import { useEffect, useReducer } from 'react'

export default function LibraryLocation() {
    const [event, updateEvent] = useReducer(
        (prev, next) => {
            return { ...prev, ...next }
        },
        {
            libraryLocations: [],
        }
    )

    const getLibraryLocation = async () => {
        try {
            const resp = await LibraryLocationService.getLibraryLocations()
            if (resp.data.success) {
                updateEvent({
                    libraryLocations: resp.data.data,
                })
            }
        } catch {}
    }

    useEffect(() => {
        getLibraryLocation()
    }, [])
    return (
        <Container>
            <SubHeaderCard>
                <div>
                    <h2 className="font-bold uppercase text-muted-foreground">
                        Libaray Location
                    </h2>
                </div>
                <div>
                    <Link href={'/library-location/create'}>
                        <Button variant={'outline'} className="bg-white">
                            Add Library Location
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
                    columns={assets.data.columns.LibraryLocationColumns(getLibraryLocation)}
                    data={event.libraryLocations}
                    totalCount={0}
                    allCheck={false}
                    setAllCheck={() => {}}
                    rowAction={[
                        { name: 'Edit', type: 'LINK', url: '/library-location/' },
                        { name: 'Delete', type: 'DELETE' },
                    ]}
                />
            </BaseCard>
        </Container>
    )
}
