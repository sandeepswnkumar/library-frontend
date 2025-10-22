'use client'
import { assets } from '@/assets/assets'
import BaseCard from '@/components/Custom/BaseCard'
import Datatable from '@/components/Custom/Datatable'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LibraryService from '@/services/LibraryService'
import Link from 'next/link'
import { useEffect, useReducer } from 'react'

export default function Library() {
    const [event, updateEvent] = useReducer(
        (prev, next) => {
            return { ...prev, ...next }
        },
        {
            libraries: [],
        }
    )

    const getLibraries = async () => {
        try {
            const resp = await LibraryService.getLibraries()
            if (resp.data.success) {
                updateEvent({
                    libraries: resp.data.data,
                })
            }
        } catch {}
    }

    useEffect(() => {
        getLibraries()
    }, [])
    return (
        <Container>
            <SubHeaderCard>
                <h2 className="font-bold uppercase text-muted-foreground">
                    Libaray
                </h2>
                <div>
                    <Link href={'/library/create'}>
                        <Button variant={'outline'} className="bg-white">
                            Add Library
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
                    columns={assets.data.columns.LibraryColumns}
                    data={event.libraries}
                    totalCount={0}
                    allCheck={false}
                    setAllCheck={() => {}}
                    rowAction={[
                        { name: 'Edit', type: 'LINK', url: '/library/' },
                        { name: 'Delete', type: 'DELETE' },
                    ]}
                />
            </BaseCard>
        </Container>
    )
}
