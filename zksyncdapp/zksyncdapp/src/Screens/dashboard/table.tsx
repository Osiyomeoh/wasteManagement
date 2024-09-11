"use client";

import * as React from "react";
// import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/src/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
// import Image from "next/image";
// import { filePdf, getMB } from "@/src/lib/types/constant";
// import { Edit2, Eye, Trash } from "iconsax-react";

const data: Transaction[] = [
    {
        weight: "#3066",
    tokensEarned: 200,
    transactionDate: new Date(),
    transactionCost: 10000,
    },
    
    {
        weight: "#4066",
    tokensEarned: 400,
    transactionDate: new Date(),
    transactionCost: 12000,
    },
    {
        weight: "#5066",
    tokensEarned: 600,
    transactionDate: new Date(),
    transactionCost: 50000,
    },
    {
      weight: "#4066",
  tokensEarned: 400,
  transactionDate: new Date(),
  transactionCost: 12000,
  },
  {
    weight: "#4066",
tokensEarned: 400,
transactionDate: new Date(),
transactionCost: 12000,
},
{
  weight: "#4066",
tokensEarned: 400,
transactionDate: new Date(),
transactionCost: 12000,
},
{
  weight: "#4066",
tokensEarned: 400,
transactionDate: new Date(),
transactionCost: 12000,
},
{
  weight: "#4066",
tokensEarned: 400,
transactionDate: new Date(),
transactionCost: 12000,
},
{
  weight: "#4066",
tokensEarned: 400,
transactionDate: new Date(),
transactionCost: 12000,
},
    
    
]


export type Transaction = {
    weight: string;
    tokensEarned: number;
    transactionDate: Date;
    transactionCost: number;
    
  };

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-3">
        <div className="">
          <p className="text-sm  ">{row.getValue("weight")}</p>
        </div>
      </div>
    ),
  },
 
  {
    accessorKey: "tokensEarned",
    header: () => <div className="text-left">Tokens earned</div>,
    cell: ({ row }) => (
        <div className="capitalize flex items-center gap-3">
          {/* <Image src={filePdf} alt="file" width={30} height={30} /> */}
          <div className="">
            <p className="text-sm  ">{row.original.tokensEarned}</p>
            {/* <p className="text-xs  /90">{getMB(row.original)} MB</p> */}
          </div>
        </div>
      ),
  },
  {
    accessorKey: "Date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0 font-normal text-sm"
        >
          Date
          {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-sm  ">
        {row.original.transactionDate.toDateString().slice(0, 15)}
      </div>
    ),
  },
  {
    accessorKey: "transactionCost",
    header: "Transaction Cost",
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-3">
        <div className="">
          <p className="text-sm  ">{row.getValue("transactionCost")}</p>
        </div>
      </div>
    ),
  },
  

  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuItem className="flex items-center gap-3">
  //             <Edit2 size={18} color={"#000"} /> <p className="text-sm">Edit</p>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem className="flex items-center gap-3">
  //             <Trash size={18} color={"#000"} />{" "}
  //             <p className="text-sm">Delete</p>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem className="flex items-center gap-3">
  //             <Eye size={18} /> <p className="text-sm">View details</p>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full text-black">
      <div className="">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-normal text-sm">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}


