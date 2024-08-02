'use client';

import { ColumnDef, SortingFn } from '@tanstack/react-table';
import React from 'react';
import { PositionInQueue } from '@/lib/types/queue.types';
import { AdminStatusSelect } from './AdminStatusSelect';
import { AdminTableHeaderButton } from './AdminTableHeaderButton';

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

export const QueueColumns: ColumnDef<PositionInQueue>[] = [
  {
    accessorKey: 'relativePosition',
    enableHiding: false,
    header: ({ column }) => {
      return <AdminTableHeaderButton text='№' column={column} />;
    },
    cell: ({ row }) => <div>{row.original.relativePosition || '-'} </div>,
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
];
