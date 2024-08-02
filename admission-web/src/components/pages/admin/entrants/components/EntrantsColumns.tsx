'use client';
import { AdminUser } from '@/app/api/admin-entrants/admin-entrants-api.types';
import { ColumnDef } from '@tanstack/react-table';

export const EntrantsColumns: ColumnDef<AdminUser>[] = [
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
];
