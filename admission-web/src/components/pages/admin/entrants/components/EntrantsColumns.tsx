'use client';
import { EducationalDegree } from '$/utils/src/enums/EducationalDegreeEnum';
import { AdminUser } from '@/app/api/admin-entrants/admin-entrants-api.types';
import { educationalDegreeLabels } from '@/lib/constants/educationalDegreeLabels';
import { ColumnDef } from '@tanstack/react-table';
import { userRoles } from '@/lib/constants/userRoles';
import { Badge } from '@/components/ui/badge';

export const EntrantsColumns: ColumnDef<AdminUser>[] = [
  {
    accessorKey: 'lastName',
    header: 'ПІБ',
    cell: ({ row }) => {
      const { lastName, firstName, middleName } = row.original;
      const rowMiddleName = middleName || '';
      return `${lastName} ${firstName} ${rowMiddleName}`;
    },
  },
  {
    accessorKey: 'role',
    header: 'Роль',
    cell: ({ row }) => {
      return userRoles[row.original.role];
    },
  },
  {
    accessorKey: 'contracts',
    header: 'Освітній ступінь',
    cell: ({ row }) => {
      return row.original.contracts.length
        ? educationalDegreeLabels[
            row.original.contracts[0].degree as EducationalDegree
          ]
        : '-';
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
      const { contracts, role } = row.original;

      if (role === 'ADMIN') {
        return (
          <Badge className='bg-gray-500 hover:bg-gray-500'>Відсутній</Badge>
        );
      }

      if (contracts.length === 0) {
        return <Badge className='bg-red-600 hover:bg-red-600'>Не подано</Badge>;
      }

      const isApproved = contracts.some(
        (contract) => contract.state === 'APPROVED'
      );

      return (
        <Badge
          className={
            isApproved
              ? 'bg-green-600 hover:bg-green-600'
              : 'bg-blue-600 hover:bg-blue-600'
          }
        >
          {isApproved ? 'Зареєстровано' : 'Подано'}
        </Badge>
      );
    },
  },
];
