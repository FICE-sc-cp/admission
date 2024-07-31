import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProfileHeader } from '@/app/(application)/_components/student-profile-page/ProfileHeader';
import { DocumentsApiBody } from '@/app/api/documents/documents-api.types';
import DocumentsApi from '@/app/api/documents/documents-api';
import { downloadFile } from '@/lib/utils/downloadFile';
import useAuth from '@/hooks/useAuth';

export function NoDocumentsPopUp({
  contracts,
}: {
  contracts: DocumentsApiBody[];
}) {
  const { user } = useAuth();

  const downloadDocument = async (contract: DocumentsApiBody) => {
    const res = await DocumentsApi.downloadContract(contract.id as string);

    downloadFile(res.data, user, contract, 'Навчання');

    if (contract.fundingSource === 'CONTRACT') {
      const res = await DocumentsApi.downloadPayment(contract.id as string);

      downloadFile(res.data, user, contract, 'Оплата');
    }

    if (contract.specialty === '121' || contract.specialty === '126') {
      const res = await DocumentsApi.downloadPriority(contract.id as string);

      downloadFile(res.data, user, contract, 'Пріоритети');
    }
  };

  return contracts.length > 0 ? (
    contracts.map((contract: DocumentsApiBody) => (
      <div key={contract.number} className='m-5 flex flex-col'>
        <ProfileHeader className='mb-3' label='Заповнені договори' />
        <div className='flex w-auto flex-col rounded-lg bg-violet-100 p-5'>
          <div className='flex flex-col-reverse border-b border-violet-600 sm:flex-row sm:justify-between'>
            <h2 className='m-2 ml-0 whitespace-nowrap text-xl font-normal'>
              Договір № {contract.number}
            </h2>
            <Button
              className='mb-2 w-fit'
              onClick={() => downloadDocument(contract)}
            >
              Завантажити
            </Button>
          </div>
          <div className='mt-3 flex flex-col gap-3 text-sm font-light'>
            <h6>Освітній рівень: {contract.degree}</h6>
            <h6>Спеціальність: {contract.specialty}</h6>
            <h6>Форма навчання: {contract.studyForm}</h6>
            <h2 className='font-medium'>Пріоритети освітніх програм</h2>
            {contract.priorities.map((priority) => (
              <h6 key={priority.number}>
                {priority.number + '.' + priority.program}
              </h6>
            ))}
          </div>
        </div>
      </div>
    ))
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
