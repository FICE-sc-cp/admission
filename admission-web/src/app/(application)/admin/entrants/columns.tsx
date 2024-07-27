'use client';
import {ColumnDef} from '@tanstack/react-table';
import {User} from '@/constants/admin-entrants-table';
import {AdminDeleteEntrantCell} from "@/app/admin/entrants/components/AdminDeleteEntrantCell";

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
        cell: ({row}) => {
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
        cell: ({row}) => {
            const contracts = row.original.contracts;
            return contracts.some((contract) => contract.state === 'APPROVED')
                ? 'ПОДАНО'
                : 'НЕ ПОДАНО';
        },
    },
    {
        accessorKey: 'id',
        header: '',
        cell: ({row}) => {
            return <AdminDeleteEntrantCell row={row} />
        }
    },
];
