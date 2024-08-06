import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DocumentsApiBody } from '@/app/api/documents/documents-api.types';
import DocumentsApi from '@/app/api/documents/documents-api';
import { downloadFile } from '@/lib/utils/downloadFile';
import useAuth from '@/lib/hooks/useAuth';
import { ProfileHeader } from './ProfileHeader';
import { educationalDegreeLabels } from '@/lib/constants/educationalDegreeLabels';
import { studyFormLabels } from '@/lib/constants/studyFormLabels';
import {
  FundingSourceLabels,
  PaymentTypeLabels,
} from '@/lib/constants/fundingSourceLabels';
import { EducationProgramAbbreviation } from '@/lib/constants/educational-programs';

export function NoDocumentsPopUp({
  contracts,
}: {
  contracts: DocumentsApiBody[];
}) {
  const { user } = useAuth();

  const downloadDocument = async (contract: DocumentsApiBody, type: string) => {
    switch (type) {
      case 'contract': {
        const res = await DocumentsApi.downloadContract(contract.id as string);

        return downloadFile(
          res.data,
          `${user?.lastName} ${user?.firstName} ${user?.middleName ? user?.middleName : ''}`,
          contract,
          'Навчання'
        );
      }
      case 'payment': {
        const res = await DocumentsApi.downloadPayment(contract.id as string);

        return downloadFile(
          res.data,
          `${user?.lastName} ${user?.firstName} ${user?.middleName ? user?.middleName : ''}`,
          contract,
          'Оплата'
        );
      }
      case 'priority': {
        const res = await DocumentsApi.downloadPriority(contract.id as string);

        return downloadFile(
          res.data,
          `${user?.lastName} ${user?.firstName} ${user?.middleName ? user?.middleName : ''}`,
          contract,
          'Пріоритети'
        );
      }
    }
  };

  return contracts.length > 0 ? (
    <div className='m-5 flex flex-col'>
      <ProfileHeader className='mb-3' label='Заповнені договори' />
      {contracts.map((contract: DocumentsApiBody) => (
        <div key={contract.number} className='mb-5 flex flex-col'>
          <div className='flex w-auto flex-col rounded-lg bg-violet-100 p-5'>
            <div className='flex flex-col-reverse border-b border-violet-600 sm:flex-row sm:justify-between'>
              <h2 className='m-2 ml-0 text-xl font-normal'>
                Договір{' '}
                {contract.number
                  ? `№ ${contract.number}`
                  : '(не зареєстровано)'}{' '}
                {contract.date ? `від ${contract.date}` : ''}
              </h2>
              <div className='flex flex-col gap-2 sm:flex-row'>
                <Button
                  className='w-fit'
                  onClick={() => downloadDocument(contract, 'contract')}
                >
                  Договір про навчання
                </Button>
                {contract.fundingSource === 'CONTRACT' ? (
                  <Button
                    className='w-fit'
                    onClick={() => downloadDocument(contract, 'payment')}
                  >
                    Договір про оплату
                  </Button>
                ) : null}
                {contract.specialty === '121' ||
                contract.specialty === '126' ? (
                  <Button
                    className='w-fit'
                    onClick={() => downloadDocument(contract, 'priority')}
                  >
                    Пріоритети
                  </Button>
                ) : null}
              </div>
            </div>
            <div className='mt-3 flex flex-col gap-3 text-sm font-light'>
              <h6>
                Освітній рівень: {educationalDegreeLabels[contract.degree]}
              </h6>
              <h6>Спеціальність: {contract.specialty}</h6>
              <h6>Форма навчання: {studyFormLabels[contract.studyForm]}</h6>
              <h6>
                Джерело фінансування:{' '}
                {contract.fundingSource === 'BUDGET'
                  ? FundingSourceLabels[contract.fundingSource]
                  : `${FundingSourceLabels[contract.fundingSource] || ''}${
                      contract.paymentType != null
                        ? ` (${PaymentTypeLabels[contract.paymentType] || ''})`
                        : ''
                    }`}
              </h6>
              <h2 className='font-medium'>
                {contracts.some(
                  (contract) =>
                    (contract.specialty === '121' &&
                      contract.studyForm === 'PART_TIME') ||
                    contract.specialty === '123'
                )
                  ? ''
                  : 'Пріоритети освітніх програм'}
              </h2>
              {contract.priorities
                .sort((a, b) => a.number - b.number)
                .map((priority) => (
                  <h6 key={priority.number}>
                    {priority.number +
                      '.' +
                      ' ' +
                      EducationProgramAbbreviation[priority.program]}
                  </h6>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className='m-5 flex flex-col'>
      <ProfileHeader label='Заповнені договори' />
      <Card className='mx-auto mt-3 flex w-full flex-col items-center justify-center border-violet-300 bg-violet-50 text-center drop-shadow-lg sm:ml-0 sm:flex-row sm:justify-between'>
        <CardHeader className='text-lg font-light'>
          Ви ще не заповнили жодного договору про навчання!
        </CardHeader>
        <CardFooter className='sm:p-3'>
          <Button asChild>
            <Link href='/documents'>Заповнити договір</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
