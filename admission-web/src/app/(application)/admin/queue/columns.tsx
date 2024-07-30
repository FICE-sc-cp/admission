'use client';

import { ColumnDef, SortingFn } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { AdminTableHeaderButton } from '@/app/(application)/admin/queue/components/AdminTableHeaderButton';
import { AdminStatusSelect } from '@/app/(application)/admin/queue/components/AdminStatusSelect';
import AdminAlertDialog from '@/app/(application)/admin/_components/AdminAlertDialog';
import { QueuePosition } from '@/app/api/admin-queue/admin-queue-api.types';
import React from 'react';
import AdminQueueApi from '@/app/api/admin-queue/admin-queue-api';
import { useRouter } from 'next/navigation';

const lastNameSort: SortingFn<any> = (rowA, rowB) => {
  const a = rowA.original.user.lastName;
  const b = rowB.original.user.lastName;
  return a.localeCompare(b, 'uk', { sensitivity: 'base' });
};

const edeboSort: SortingFn<any> = (rowA, rowB) => {
  const a = rowA.original.user.printedEdbo ? 'ТАК' : 'НІ';
  const b = rowB.original.user.printedEdbo ? 'ТАК' : 'НІ';
  return a.localeCompare(b, 'uk', { sensitivity: 'base' });
};

const dormSort: SortingFn<any> = (rowA, rowB) => {
  const a = rowA.original.user.isDorm ? 'ТАК' : 'НІ';
  const b = rowB.original.user.isDorm ? 'ТАК' : 'НІ';
  return a.localeCompare(b, 'uk', { sensitivity: 'base' });
};

const emailSort: SortingFn<any> = (rowA, rowB) => {
  const a = rowA.original.user.email;
  const b = rowB.original.user.email;
  return a.localeCompare(b, 'us', { sensitivity: 'base' });
};

const specialtySort: SortingFn<any> = (rowA, rowB) => {
  const a = rowA.original.user.expectedSpecialities;
  const b = rowB.original.user.expectedSpecialities;
  return a.localeCompare(b, 'uk', { numeric: true, sensitivity: 'base' });
};

export const columns: ColumnDef<QueuePosition>[] = [
  {
    accessorKey: 'relativePosition',
    enableHiding: false,
    header: ({ column }) => {
      return <AdminTableHeaderButton text='№' column={column} />;
    },
  },
  {
    accessorKey: 'code',
    enableHiding: false,
    header: ({ column }) => {
      return <AdminTableHeaderButton text='id' column={column} />;
    },
  },
  {
    accessorKey: 'lastName',
    enableHiding: false,
    sortingFn: lastNameSort,
    header: ({ column }) => {
      return <AdminTableHeaderButton text='ПІБ' column={column} />;
    },
    cell: ({ row }) => {
      return row.original.user.lastName;
    },
  },
  {
    accessorKey: 'firstName',
    enableHiding: false,
    header: '',
    cell: ({ row }) => {
      return row.original.user.firstName;
    },
  },
  {
    accessorKey: 'middleName',
    enableHiding: false,
    header: '',
    cell: ({ row }) => {
      return row.original.user.middleName;
    },
  },
  {
    accessorKey: 'phone',
    enableHiding: false,
    header: 'Номер телефону',
    cell: ({ row }) => {
      return row.original.user.phone;
    },
  },
  {
    accessorKey: 'email',
    meta: 'Email',
    sortingFn: emailSort,
    header: ({ column }) => {
      return <AdminTableHeaderButton text='Email' column={column} />;
    },
    cell: ({ row }) => {
      return row.original.user.email;
    },
  },
  {
    accessorKey: 'printedEdbo',
    meta: 'ЄДЕБО',
    sortingFn: edeboSort,
    header: ({ column }) => {
      return <AdminTableHeaderButton text='ЄДЕБО' column={column} />;
    },
    cell: ({ row }) => {
      const printedEdbo = row.original.user.printedEdbo;
      return printedEdbo ? 'ТАК' : 'НІ';
    },
  },
  {
    accessorKey: 'expectedSpecialities',
    meta: 'Спеціальність',
    sortingFn: specialtySort,
    header: ({ column }) => {
      return <AdminTableHeaderButton text='Спеціальність' column={column} />;
    },
    cell: ({ row }) => {
      return row.original.user.expectedSpecialities;
    },
  },
  {
    accessorKey: 'isDorm',
    meta: 'Гуртожиток',
    sortingFn: dormSort,
    header: ({ column }) => {
      return <AdminTableHeaderButton text='Гуртожиток' column={column} />;
    },
    cell: ({ row }) => {
      return row.original.user.isDorm ? 'ТАК' : 'НІ';
    },
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <AdminStatusSelect
          status={row.original.status}
          id={row.original.userId}
        />
      );
    },
  },
  {
    accessorKey: 'buttons',
    header: '',
    enableHiding: false,
    cell: ({ row }) => {
      const { refresh } = useRouter();
      return (
        <div className='flex items-center space-x-4'>
          <AdminAlertDialog
            button={<Button>Перенесення вниз</Button>}
            title='Перенесення вниз по черзі'
            description='Ви впевнені? Вступника буде перенесено вниз на 5 позицій по черзі!'
            action={async () => {
              try {
                await AdminQueueApi.changePosition(row.original.userId, {
                  delta: 5,
                });
                refresh();
              } catch (error) {
                console.error(error);
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
                await AdminQueueApi.deleteEntrant(row.original.userId);
                refresh();
              } catch (error) {
                console.error(error);
              }
            }}
          />
        </div>
      );
    },
  },
];
