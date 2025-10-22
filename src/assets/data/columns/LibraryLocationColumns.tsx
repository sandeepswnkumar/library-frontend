import StatusBadge from '@/components/Custom/StatusBadge'
import { Switch } from '@/components/ui/switch'
import LibraryLocationService from '@/services/LibraryLocationService'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export const LibraryLocationColumns = (
    getLibraryLocation: () => Promise<any>
): ColumnDef<unknown>[] => {
    return [
        {
            accessorKey: 'checkbox',
            header: 'checkbox',
            enableSorting: false,
        },
        {
            accessorKey: 'isActive',
            header: 'Active',
            enableSorting: false,
            cell: (cellData) => {
                const { getValue, row } = cellData
                return (
                    <Switch
                        checked={Boolean(getValue())}
                        onCheckedChange={async (isChecked) => {
                            try {
                                let rowData = row?.original as any
                                if (!rowData?.id) return false
                                const resp =
                                    await LibraryLocationService.updateLibraryLocation(
                                        rowData?.id,
                                        { isActive: isChecked }
                                    )
                                if (resp.data.success) {
                                    getLibraryLocation()
                                }
                            } catch (err) {
                                console.log('err', err)
                            }
                        }}
                    />
                )
            },
        },
        {
            accessorKey: 'id',
            header: 'ID',
            enableSorting: true,
        },
        {
            accessorKey: 'library.libraryName',
            header: 'Library Name',
            enableSorting: true,
            cell: ({ getValue, row }) => {
                let rowData = row?.original as any
                if (!rowData?.id) return false
                   return <Link className='hover:underline' href={`/library-location/${rowData?.id}`}>{String(getValue() ?? '')}</Link>
            },
        },
        {
            accessorKey: 'locationName',
            header: 'Branch Name',
            enableSorting: true,
        },

        {
            accessorKey: 'email',
            header: 'Email',
            enableSorting: false,
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
            enableSorting: false,
        },
        {
            accessorKey: 'action',
            header: 'Action',
            enableSorting: false,
        },
    ]
}
