'use client';

import { ColumnDef } from '@tanstack/react-table';
import AdminStatusSelect from '@/app/admin/queue/components/AdminStatusSelect';
import AdminTableHeaderButton from '@/app/admin/queue/components/AdminTableHeaderButton';
import AdminAlertDialog from '@/app/admin/_components/AdminAlertDialog';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';

export type AdminQueue = {
  number: number;
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  printed: boolean;
  specialty: number;
  accommodation: boolean;
  status: 'pending' | 'progress' | 'done';
};

export const columns: ColumnDef<AdminQueue>[] = [
  {
    accessorKey: 'number',
    enableHiding: false,
    header: ({ column }) => {
      return <AdminTableHeaderButton text='№' column={column} />;
    },
  },
  {
    accessorKey: 'id',
    enableHiding: false,
    header: ({ column }) => {
      return <AdminTableHeaderButton text='id' column={column} />;
    },
  },
  {
    accessorKey: 'name',
    enableHiding: false,
    header: ({ column }) => {
      return <AdminTableHeaderButton text='ПІБ' column={column} />;
    },
  },
  {
    accessorKey: 'phoneNumber',
    enableHiding: false,
    header: ({ column }) => {
      return <AdminTableHeaderButton text='Номер телефону' column={column} />;
    },
    cell: ({ row }) => {
      return <div className='min-w-[125px]'>{row.getValue('phoneNumber')}</div>;
    },
  },
  {
    accessorKey: 'email',
    meta: 'Email',
    header: ({ column }) => {
      return <AdminTableHeaderButton text='Email' column={column} />;
    },
  },
  {
    accessorKey: 'printed',
    meta: 'ЄДЕБО',
    header: ({ column }) => {
      return <AdminTableHeaderButton text='ЄДЕБО' column={column} />;
    },
  },
  {
    accessorKey: 'specialty',
    meta: 'Спеціальність',
    header: ({ column }) => {
      return <AdminTableHeaderButton text='Спеціальність' column={column} />;
    },
  },
  {
    accessorKey: 'accommodation',
    meta: 'Гуртожиток',
    header: ({ column }) => {
      return <AdminTableHeaderButton text='Гуртожиток' column={column} />;
    },
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    enableHiding: false,
    cell: () => {
      return <AdminStatusSelect />;
    },
  },
  {
    accessorKey: 'buttons',
    header: '',
    enableHiding: false,
    cell: () => {
      return (
        <>
          <div className='flex items-center space-x-4'>
            <AdminAlertDialog
              button={<Button>Перенесення вниз</Button>}
              title='Перенесення вниз по черзі'
              description='Ви впевнені? Вступника буде перенесено вниз на 5 позицій по черзі!'
              action={() => {}}
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
              action={() => {}}
            />
          </div>
        </>
      );
    },
  },
];
