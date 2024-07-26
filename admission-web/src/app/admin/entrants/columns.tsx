'use client';

import { ColumnDef } from '@tanstack/react-table';
import AdminAlertDialog from '@/app/admin/_components/AdminAlertDialog';
import { User } from '@/constants/admin-entrants-table';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import instance from '@/lib/api/instance';
import { useRouter } from 'next/navigation';
export async function deleteEntrant(id: string) {
  await instance.delete(`/users/${id}`);
}
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'lastName',
    header: 'ПІБ',
  },
  {
    accessorKey: 'firstName',
    header: '',
  },
  {
    accessorKey: 'middleName',
    header: '',
  },
  {
    accessorKey: 'contracts',
    header: 'Освітній ступінь',
    cell: ({ row }) => {
      const contracts = row.original.contracts;
      return contracts.map((contract) => contract.degree);
    },
  },
  {
    accessorKey: 'expectedSpecialities',
    header: 'Спеціальність',
  },
  {
    accessorKey: 'contracts',
    header: 'Статус',
    cell: ({ row }) => {
      const contracts = row.original.contracts;
      return contracts.some((contract) => contract.state === 'APPROVED')
        ? 'ПОДАНО'
        : 'НЕ ПОДАНО';
    },
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => {
      const { refresh } = useRouter();

      return (
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
          description='Ви впевнені, що хочете видалити вступика? Вспупник буде видалений разом із всіма його документами, цю дію неможливо буде відмінити!'
          action={async () => {
            try {
              await deleteEntrant(row.original.id);
              console.log('success (maybe we should add a toast here)');
            } catch (error) {
              console.log('error (maybe we should add a toast here)');
            }
            refresh();
          }}
        />
      );
    },
  },
];
