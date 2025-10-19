import type { ColumnDef } from "@tanstack/react-table";

export const Columns:ColumnDef<unknown>[] = [
  {
    accessorKey: "checkbox",
    header: "checkbox",
    enableSorting:false,
  },
  {
    accessorKey: "id",
    header: "ID",
    enableSorting:false,
  },
  {
    accessorKey: "col_1",
    header: "Col 1",
    enableSorting:true,
  },
  {
    accessorKey: "col_2",
    header: "Col 2",
    enableSorting:false,
  },
  {
    accessorKey: "col_3",
    header: "Col 3",
    enableSorting:true,
  },
  {
    accessorKey: "col_4",
    header: "Col 4",
    enableSorting:false,
  },
  {
    accessorKey: "col_5",
    header: "Col 5",
    enableSorting:false,
  },
  {
    accessorKey: "col_6",
    header: "Col 6",
    enableSorting:false,
  },
  {
    accessorKey: "action",
    header: "Action",
    enableSorting:false,
  },
];