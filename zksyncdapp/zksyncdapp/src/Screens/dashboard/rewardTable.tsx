"use client"
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/src/components/ui/table";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Button } from "@/src/components/ui/button";
import { MoveDownIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import CmdR from "@/public/images/cmdR.png"
import Circooles from "@/public/images/Circooles.png"
import Circl from "@/public/images/Circ.png"
import RedeemModal from "./RedeemModal";

function  RewardTable() {
  return <div className="w-full">
  <div className="border border-neutral-300 rounded-lg w-full mt-4 py-3">
  <h1 className="px-6 pb-3 text-2xl font-semibold">Customers</h1>
  <p className="px-6 border-b pb-4 text-gray-600">These companies have purchased in the last 12 months.</p>
  <DataTableDemo2 />
  </div>
</div>;
}

export default RewardTable;





const data: Reward[] = [
    {
        rewardName: "Catalog",
        rewardLink: "catalogapp.io",
        image: Circl,
        tokensRequired: 300000,
        RedeemReward: new Date(),
    },
    {
        rewardName: "Circooles",
        rewardLink: "catalogapp.io",
        image: Circooles,
        tokensRequired: 300000,
        RedeemReward: new Date(),
    },
    {
        rewardName: "Command+R",
        rewardLink: "catalogapp.io",
        image: CmdR,
        tokensRequired: 300000,
        RedeemReward: new Date(),
    },
    {
        rewardName: "Catalog",
        rewardLink: "catalogapp.io",
        image: Circl,
        tokensRequired: 300000,
        RedeemReward: new Date(),
    },
    {
        rewardName: "Circooles",
        rewardLink: "catalogapp.io",
        image: Circooles,
        tokensRequired: 300000,
        RedeemReward: new Date(),
    },
    {
        rewardName: "Command+R",
        rewardLink: "catalogapp.io",
        image: CmdR,
        tokensRequired: 300000,
        RedeemReward: new Date(),
    },
]

  export type Reward = {
    rewardName: string;
    rewardLink: string,
    image: StaticImageData;
    tokensRequired: number;
    RedeemReward: Date;
  };

export function DataTableDemo2() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [isOpen, setIsOpen] = React.useState(false)
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    );
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const columns: ColumnDef<Reward>[] = [
  
      {
        accessorKey: "rewardName",
        header: () => <div className="flex items-center font-semibold">Reward Name <MoveDownIcon className="ml-2 h-4 w-4" /></div>,
        cell: ({ row }) => (
          <div className="capitalize flex items-center gap-3">
            <div className="flex space-x-2 items-center">
                <Image src={row.original.image} alt="image" />
                <div>
                    <p className="text-sm font-semibold ">{row.getValue("rewardName")}</p>
                    <p className="text-gray-500">{row.original.rewardLink}</p>
                </div>
              
            </div>
          </div>
        ),
      },
     
      {
        accessorKey: "tokensRequired",
        header: () => <div className="text-left font-semibold">Tokens Required</div>,
        cell: ({ row }) => (
            <div className="capitalize flex items-center gap-3">
              <div className="">
                <p className="text-sm  border border-gray-200 rounded-md p-[5px] flex items-center "><span className="w-2 h-2 rounded-full bg-[#17B26A] inline-block mr-2"></span>{row.original.tokensRequired}</p>
              </div>
            </div>
          ),
      },
      {
        accessorKey: "RedeemReward",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="pl-0 font-normal text-sm"
            >
              Redeem reward
            </Button>
          );
        },
        cell: () => (
          <Button
          variant="ghost"
          onClick={()=>{setIsOpen(!isOpen)}} 
          className="text-[16px] border border-gray-200 text-gray-600 p-2 rounded-md font-semibold text w-[7vw] text-center"
        >
          Redeem
        </Button>
        ),
      },
      
    
    ];
    
  
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
        <RedeemModal isOpen={isOpen} onClose={()=>{setIsOpen(!isOpen)}}  />
      </div>
    );
  }
  