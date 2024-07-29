'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { useState } from 'react';
import { AdminColumnSelect } from '@/app/(application)/admin/queue/components/AdminColumnSelect';
import { OpenQueueButton } from '@/app/(application)/admin/queue/components/OpenQueueButton';
import { AdminQueueCleanUp } from '@/app/(application)/admin/queue/components/AdminQueueCleanUp';

interface AdminQueueDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const initialColumnVisibility = {
  relativePosition: true,
  lastName: true,
  firstName: true,
  middleName: true,
  phone: true,
  email: false,
  printedEdbo: false,
  expectedSpecialities: false,
  isDorm: false,
  status: true,
  buttons: true,
};

export function AdminQueueDataTable<TData, TValue>({
  columns,
  data,
}: AdminQueueDataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnVisibility,
      sorting,
    },
  });

  return (
    <>
      <div className='mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:gap-0'>
        <h1 className='text-2xl font-medium'>Керування чергою</h1>
        <div className='flex items-center space-x-3'>
          <AdminColumnSelect table={table} />
          <AdminQueueCleanUp />
          <OpenQueueButton />
        </div>
      </div>
      <div className='max-h-[700px] min-w-[1088px] overflow-y-auto rounded-md border'>
        <Table>
          <TableHeader className='bg-gray-100'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  className='hover:bg-white'
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
              <TableRow className='hover:bg-white'>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center text-xl font-light'
                >
                  У черзі нікого немає
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
