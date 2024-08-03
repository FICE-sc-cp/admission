'use client';
import { EducationalDegree } from '$/utils/src/enums/EducationalDegreeEnum';
import { AdminUser } from '@/app/api/admin-entrants/admin-entrants-api.types';
import { educationalDegreeLabels } from '@/lib/constants/educationalDegreeLabels';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { FundingSourceLabels } from '@/lib/constants/fundingSourceLabels';
import { FundingSource } from '$/utils/src/enums/FundingSourceEnum';

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
    accessorKey: 'fundingSource',
    header: 'Форма фінансування',
    cell: ({ row }) => {
      return row.original.contracts.length > 0
        ? FundingSourceLabels[
            row.original.contracts[0].fundingSource as FundingSource
          ]
        : '-';
    },
  },
  {
    accessorKey: 'expectedSpecialities',
    header: 'Спеціальність',
    cell: ({ row }) => {
      const { contracts, expectedSpecialities } = row.original;
      if (contracts.length > 0) {
        const approvedContract = contracts.find(
          (contract) => contract.state === 'APPROVED'
        );
        if (approvedContract) {
          return approvedContract.specialty;
        } else {
          return expectedSpecialities === ''
            ? contracts[0].specialty
            : expectedSpecialities;
        }
      } else {
        return '-';
      }
    },
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
