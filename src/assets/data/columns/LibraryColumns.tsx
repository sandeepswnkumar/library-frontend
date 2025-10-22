import StatusBadge from '@/components/Custom/StatusBadge'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export const LibraryColumns: ColumnDef<unknown>[] = [
    {
        accessorKey: 'checkbox',
        header: 'checkbox',
        enableSorting: false,
    },
    {
        accessorKey: 'id',
        header: 'ID',
        enableSorting: true,
    },
    {
        accessorKey: 'libraryName',
        header: 'Library Name',
        enableSorting: true,
        cell: ({ getValue, row }) => {
            let rowData = row?.original as any
            if (!rowData?.id) return false
            return (
                <Link
                    className="hover:underline"
                    href={`/library/${rowData?.id}`}
                >
                    {String(getValue() ?? '')}
                </Link>
            )
        },
    },
    {
        accessorKey: 'type.name',
        header: 'Type',
        enableSorting: false,
        cell: ({ getValue }) => {
            return <StatusBadge status={String(getValue() ?? '')} />
        },
    },
    {
        accessorKey: 'status.name',
        header: 'Status',
        enableSorting: true,
        cell: ({ getValue }) => {
            return <StatusBadge status={String(getValue() ?? '')} />
        },
    },
    {
        accessorKey: 'action',
        header: 'Action',
        enableSorting: false,
    },
]
