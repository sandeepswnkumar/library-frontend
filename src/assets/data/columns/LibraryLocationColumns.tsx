import { Switch } from '@/components/ui/switch'
import LibraryLocationService from '@/services/LibraryLocationService'
import { LibraryLocation } from '@/types/LibraryLocation'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export const LibraryLocationColumns = (
    getLibraryLocation: () => Promise<LibraryLocation>
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
                                const rowData = row?.original as LibraryLocation
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
                const rowData = row?.original as LibraryLocation
                if (!rowData?.id) return false
                   return <Link className='hover:underline' href={`/branch/${rowData?.id}`}>{String(getValue() ?? '')}</Link>
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
