'use client'
import { assets } from '@/assets/assets'
import BaseCard from '@/components/Custom/BaseCard'
import Datatable from '@/components/Custom/Datatable'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

type TableRow = {
    checkbox: boolean
    id: number
    col_1: string
    col_2: string
    col_3: string
    col_4: string
    col_5: string
    col_6: string
}

const TableData: TableRow[] = Array.from({ length: 30 }, (_, index) => ({
    checkbox: false,
    id: index + 1,
    col_1: `Data ${index + 1}-1`,
    col_2: `Data ${index + 1}-2`,
    col_3: `Data ${index + 1}-3`,
    col_4: `Data ${index + 1}-4`,
    col_5: `Data ${index + 1}-5`,
    col_6: `Data ${index + 1}-6`,
}))

export default function Library() {
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
                        <Button variant={'outline'} className='bg-white'>Add Library Location</Button>
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
                    columns={assets.data.Columns}
                    data={TableData}
                    totalCount={0}
                    allCheck={false}
                    setAllCheck={() => {}}
                />
            </BaseCard>
        </Container>
    )
}
