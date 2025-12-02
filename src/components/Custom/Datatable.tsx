'use client'
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef, Row } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'
import { ChevronLeft, ChevronRight, FileText, Settings } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'

type ActionType = {
    name: string
    type: string
    url?: string
}

type DatatableProps<T = unknown> = {
    columns: ColumnDef<T>[]
    data: T[]
    totalCount: number
    allCheck: boolean
    setAllCheck: React.Dispatch<React.SetStateAction<boolean>>
    rowAction: ActionType[]
}

const Datatable = <T,>({
    columns,
    data,
    totalCount,
    allCheck,
    setAllCheck,
    rowAction = [],
}: DatatableProps<T>) => {
    const [pageSize, setPageSize] = useState(0)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: pageSize,
    })

    // const columnCount = table.getAllLeafColumns().length || columns.length

    const handleAllChange = (
        checked: boolean | 'indeterminate',
        target: Row<T>[] | T
    ): void => {}

    const handleRedirect = (row?: T): void => {}
    return (
        <div className="w-full overflow-auto">
            <Table className="w-full ">
                <TableHeader>
                    <TableRow
                        key={'DataTableHeaderRow'}
                        className="hover:bg-gray-100  bg-gray-100 border-none"
                    >
                        {table.getHeaderGroups().map((headerGroup) =>
                            headerGroup.headers.map((header) => {
                                return header.id == 'checkbox' ? (
                                    <TableHead
                                        key={header.id}
                                        className="w-[50px]"
                                    >
                                        <Checkbox
                                            className="mx-3 my-1"
                                            onCheckedChange={(event) =>
                                                handleAllChange(
                                                    event as
                                                        | boolean
                                                        | 'indeterminate',
                                                    table.getRowModel().rows
                                                )
                                            }
                                        />
                                    </TableHead>
                                ) : (
                                    <TableHead key={header.id} className="">
                                        <div className="flex cursor-pointer text-gray-600 text-[13px]">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                            {header.column.getCanSort() && (
                                                <div className="">
                                                    <IoMdArrowDropup
                                                        size={15}
                                                        className="m-0 p-0  text-muted-foreground"
                                                    />
                                                    <IoMdArrowDropdown
                                                        size={15}
                                                        className="m-0 p-0 mt-[-8px] text-muted-foreground"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </TableHead>
                                )
                            })
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row, pI) => (
                            <TableRow
                                key={row.id}
                                onClick={() => handleRedirect(row.original)}
                                className={`border-none hover:bg-transparent ${
                                    (pI + 1) % 2 == 0
                                        ? 'bg-gray-100 hover:bg-gray-100'
                                        : ''
                                }`}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={'TableData' + cell.column.id}
                                        className={`text-[13px]`}
                                    >
                                        {['checkbox', 'action'].includes(
                                            cell.column.id
                                        ) ? (
                                            <>
                                                {cell.column.id ===
                                                    'checkbox' && (
                                                    <Checkbox
                                                        className="mx-3 my-1"
                                                        onCheckedChange={(
                                                            event
                                                        ) =>
                                                            handleAllChange(
                                                                event as
                                                                    | boolean
                                                                    | 'indeterminate',
                                                                row.original
                                                            )
                                                        }
                                                        checked={allCheck}
                                                    />
                                                )}
                                                {cell.column.id ===
                                                    'action' && (
                                                    <RowAction
                                                        rowAction={rowAction}
                                                        rowId={String(
                                                            row.getValue('id')
                                                        )}
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow key={'DataNotFoundKey'}>
                            <TableCell
                                colSpan={100}
                                className="py-6 text-center"
                            >
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <FileText
                                        className="h-8 w-8 text-muted-foreground"
                                        aria-hidden="true"
                                    />
                                    <span className="text-gray-400">
                                        No record found
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter className="bg-transparent">
                    <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={100}>
                            <div className="mt-2">
                                <Pagination />
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

const Pagination = () => {
    return (
        <div className="flex justify-between items-center gap-3 flex-wrap ">
            <span>Showing 151 to 180 of 490</span>
            <div className="flex justify-end gap-2 items-center">
                <Link
                    className="border h-8 flex items-center justify-center p-2 hover:bg-purple-600 hover:text-white"
                    href={'/'}
                >
                    First
                </Link>
                <Link
                    className="border h-8 flex items-center justify-center p-2 hover:bg-purple-600 hover:text-white"
                    href={'/'}
                >
                    <ChevronLeft size={18} />
                </Link>
                <Link
                    className="border h-8 flex items-center justify-center p-2 hover:bg-purple-600 hover:text-white"
                    href={'/'}
                >
                    1
                </Link>
                <Link
                    className="border h-8 flex items-center justify-center p-2 hover:bg-purple-600 hover:text-white"
                    href={'/'}
                >
                    2
                </Link>
                <Link
                    className="border h-8 flex items-center justify-center p-2 hover:bg-purple-600 hover:text-white"
                    href={'/'}
                >
                    3
                </Link>
                <Link
                    className="border h-8 flex items-center justify-center p-2 hover:bg-purple-600 hover:text-white"
                    href={'/'}
                >
                    <ChevronRight size={18} />
                </Link>
                <Link
                    className="border h-8 flex items-center justify-center p-2 hover:bg-purple-600 hover:text-white"
                    href={'/'}
                >
                    Last
                </Link>
            </div>
        </div>
    )
}
const RowAction = ({
    rowAction,
    rowId,
}: {
    rowAction: ActionType[]
    rowId: string
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className=" outline-none">
                <Settings
                    className="ms-2 text-muted-foreground cursor-pointer"
                    size={20}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
            </DropdownMenuTrigger>

            {isMenuOpen && (
                <DropdownMenuContent className="w-full">
                    {rowAction.length &&
                        rowAction.map((action: ActionType) => {
                            if (action.type == 'LINK') {
                                return (
                                    <DropdownMenuItem
                                        key={action.name}
                                        className="w-full"
                                    >
                                        <Link
                                            className="w-full"
                                            href={action.url + rowId}
                                        >
                                            {action.name}
                                        </Link>
                                    </DropdownMenuItem>
                                )
                            }
                            if (action.type == 'DELETE') {
                                return (
                                    <DropdownMenuItem
                                        key={action.name}
                                        className="w-full"
                                    >
                                        {action.name}
                                    </DropdownMenuItem>
                                )
                            }
                        })}
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    )
}

export default Datatable
