'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
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
import { Input } from '@/components/ui/input';
import { AdminEntrantTablePagination } from '@/components/pages/admin/entrants/components/AdminEntrantTablePagination';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import AdminEntrantsApi from '@/app/api/admin-entrants/admin-entrants-api';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import AdminAlertDialog from '../../common/components/AdminAlertDialog';
import { AdminUser } from '@/app/api/admin-entrants/admin-entrants-api.types';
import Link from 'next/link';

interface DataTableProps {
  columns: ColumnDef<AdminUser>[];
  data: AdminUser[];
  fetchData: () => Promise<void>;
}

export function AdminEntrantDataTable({
  columns,
  data,
  fetchData,
}: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });
  const { toastSuccess, toastError } = useCommonToast();

  const handleDelete = async (id: string) => {
    try {
      await AdminEntrantsApi.deleteEntrant(id);
      await fetchData();
      toastSuccess('Вступника успішно видалено!');
    } catch (error) {
      toastError(error, 'Не вдалося видалити вступника');
    }
  };

  return (
    <>
      <div className='mb-3 flex flex-col gap-3'>
        <h1 className='text-2xl font-medium'>Абітурієнти</h1>
        <Input
          placeholder='Пошук...'
          value={
            (table.getColumn('lastName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('lastName')?.setFilterValue(event.target.value)
          }
          className='max-w-sm sm:max-w-lg'
        />
      </div>
      <div className='min-h-[700px] min-w-[1088px] rounded-md border bg-gray-100'>
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
          <TableBody className='ml-2'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className='bg-white hover:bg-white'
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='p-[7px] pl-[20px] pr-0'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <AdminAlertDialog
                      button={
                        <Button
                          variant='outline'
                          className='h-[50px] w-[50px] rounded-full'
                        >
                          <Trash2Icon />
                        </Button>
                      }
                      title='Видалення вступника'
                      description='Ви впевнені, що хочете видалити вступика? Вступник буде видалений разом із всіма його документами, цю дію неможливо буде відмінити!'
                      action={() => handleDelete(row.original.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/entrants/${row.original.id}`}>
                      <Button>Відкрити</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className='bg-gray-100'>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center text-xl font-light'
                >
                  Нікого не знайдено
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AdminEntrantTablePagination table={table} />
    </>
  );
}
