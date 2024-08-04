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
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import adminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { UpdateUser } from '@/app/api/admin-queue/admin-queue-api.types';
import { PositionInQueue } from '@/lib/types/queue.types';
import AdminAlertDialog from '@/components/pages/admin/common/components/AdminAlertDialog';
import { AdminColumnSelect } from './AdminColumnSelect';
import { AdminQueueCleanUp } from './AdminQueueCleanUp';
import { OpenQueueButton } from './OpenQueueButton';
import { QueueInitialColumnVisibility } from '../constants/QueueColumnVisibility';
import { GetQueueUsersRes } from '@/app/api/queue/queue-api.types';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface AdminQueueDataTableProps {
  columns: ColumnDef<PositionInQueue>[];
  data: PositionInQueue[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<PositionInQueue[], Error>>;
}

export function AdminQueueDataTable({
  columns,
  data,
  refetch,
}: AdminQueueDataTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    QueueInitialColumnVisibility
  );

  const [sorting, setSorting] = useState<SortingState>([]);
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
  const { toastSuccess, toastError } = useCommonToast();

  const handleDelete = async (id: string) => {
    try {
      await adminQueueApi.deleteEntrant(id);
      toastSuccess('Вступника успішно видалено з черги!');
      await refetch();
    } catch (error) {
      toastError(error, 'Не вдалося видалити вступника з черги');
    }
  };

  const handleMoveDown = async (id: string, delta: UpdateUser) => {
    try {
      await adminQueueApi.changePosition(id, delta);
      toastSuccess('Вступника успішно перенесено на 5 позицій вниз!');
      await refetch();
    } catch (error) {
      toastError(error, 'Не вдалося перенести вступника на 5 позицій вниз');
    }
  };

  return (
    <>
      <div className='mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:gap-0'>
        <h1 className='text-2xl font-medium'>Керування чергою</h1>
        <div className='flex items-center space-x-3'>
          <AdminColumnSelect table={table} />
          <AdminQueueCleanUp refetch={refetch} />
          <OpenQueueButton />
        </div>
      </div>
      <div className='overflow-auto rounded-md border bg-gray-100'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    className='bg-white hover:bg-white'
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
                        action={() =>
                          handleMoveDown(row.original.userId, { delta: 5 })
                        }
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
                        action={() => handleDelete(row.original.userId)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow className='bg-white hover:bg-white'>
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
