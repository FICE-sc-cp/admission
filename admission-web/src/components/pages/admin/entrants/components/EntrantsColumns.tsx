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
    accessorKey: 'degree',
    header: 'Освітній ступінь',
    sortingFn: (rowA, rowB) => {
      const getEntrantDegree = ({ contracts }: AdminUser) => {
        if (contracts.length === 0) return '-';
        return educationalDegreeLabels[
          contracts[0].degree as EducationalDegree
        ];
      };

      return getEntrantDegree(rowA.original).localeCompare(
        getEntrantDegree(rowB.original)
      );
    },
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
    sortingFn: (rowA, rowB) => {
      const getEntrantFundingSource = ({ contracts }: AdminUser) => {
        if (contracts.length === 0) return '-';
        return FundingSourceLabels[contracts[0].fundingSource as FundingSource];
      };

      return getEntrantFundingSource(rowA.original).localeCompare(
        getEntrantFundingSource(rowB.original)
      );
    },
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
    sortingFn: (rowA, rowB) => {
      const getEntrantSpecialities = ({
        contracts,
        expectedSpecialities,
      }: AdminUser) => {
        if (contracts.length === 0) return '-';
        return (
          contracts.find((contract) => contract.state === 'APPROVED')
            ?.specialty ||
          expectedSpecialities ||
          contracts[0].specialty
        );
      };

      return getEntrantSpecialities(rowA.original).localeCompare(
        getEntrantSpecialities(rowB.original)
      );
    },
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
    accessorKey: 'status',
    header: 'Статус',
    sortingFn: (rowA, rowB) => {
      const getEntrantStatus = ({ role, contracts }: AdminUser) => {
        if (role === 'ADMIN') return 'Відсутній';
        if (contracts.length === 0) return 'Не подано';
        if (contracts.some((contract) => contract.state === 'APPROVED'))
          return 'Зареєстровано';
        return 'Подано';
      };

      return getEntrantStatus(rowA.original).localeCompare(
        getEntrantStatus(rowB.original)
      );
    },
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
  {
    accessorKey: 'contractNumber',
    header: 'Номер',
    sortingFn: (rowA, rowB) => {
      const contractADate =
        rowA.original.contracts.find(
          (contract) => contract.state === 'APPROVED'
        )?.number || '-';
      const contractBDate =
        rowB.original.contracts.find(
          (contract) => contract.state === 'APPROVED'
        )?.number || '-';

      return contractADate.localeCompare(contractBDate);
    },
    cell: ({ row }) => {
      const { contracts } = row.original;

      const approvedContract = contracts.find(
        (contract) => contract.state === 'APPROVED'
      );

      return approvedContract?.number || '-';
    },
  },
  {
    accessorKey: 'contractDate',
    header: 'Дата',
    sortingFn: (rowA, rowB) => {
      const contractADate =
        rowA.original.contracts.find(
          (contract) => contract.state === 'APPROVED'
        )?.date || '-';
      const contractBDate =
        rowB.original.contracts.find(
          (contract) => contract.state === 'APPROVED'
        )?.date || '-';

      return contractADate
        .split('.')
        .reverse()
        .join('.')
        .localeCompare(contractBDate.split('.').reverse().join('.'));
    },
    cell: ({ row }) => {
      const { contracts } = row.original;

      const approvedContract = contracts.find(
        (contract) => contract.state === 'APPROVED'
      );

      return approvedContract?.date || '-';
    },
  },
];
