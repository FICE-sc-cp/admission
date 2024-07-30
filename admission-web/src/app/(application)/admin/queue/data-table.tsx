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
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import AdminAlertDialog from '../_components/AdminAlertDialog';
import adminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import { useRouter } from 'next/navigation';

interface AdminQueueDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fetchData: () => Promise<void>;
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
  fetchData,
}: AdminQueueDataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility
  );
  const { refresh } = useRouter();

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
      <div className='overflow-auto rounded-md border'>
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
              <>
                {table.getRowModel().rows.map((row) => (
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
                    <TableCell className='flex items-center space-x-4'>
                      <AdminAlertDialog
                        button={<Button>Перенесення вниз</Button>}
                        title='Перенесення вниз по черзі'
                        description='Ви впевнені? Вступника буде перенесено вниз на 5 позицій по черзі!'
                        action={async () => {
                          try {
                            await adminQueueApi.changePosition(
                              '77b65bb8-9af3-433a-911e-a67c418f4640',
                              {
                                delta: 5,
                              }
                            );
                            refresh();
                          } catch (error) {
                            console.error(error, 'error');
                          }
                        }}
                      />
                      <AdminAlertDialog
                        button={
                          <Button
                            variant='outline'
                            className='h-[50px] w-[50px] rounded-full'
                          >
                            <Trash2Icon />
                          </Button>
                        }
                        title='Видалення вступника з черги'
                        description='Ви впевнені, що хочете видалити вступика із черги?'
                        action={async () => {
                          try {
                            const res = await adminQueueApi.deleteEntrant(
                              '069cc7a1-0106-43d0-9c75-a261db9b4a7c'
                            );
                            console.log(res);
                            await fetchData();
                            refresh();
                          } catch (error) {
                            console.error(error, 'error');
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
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
