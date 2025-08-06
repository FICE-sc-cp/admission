'use client';
import PersonalDataApi from '@/app/api/personal-data/personal-data';
import { NoPersonalDataPopUp } from '@/components/pages/entrant/main/components/NoPersonalDataPopUp';
import { StudentRepresentativeBlock } from '@/components/pages/entrant/main/components/StudentRepresentativeBlock';
import { ProfileHeader } from './ProfileHeader';
import { StudentPayerBlock } from './StudentPayerBlock';
import { NoDocumentsPopUp } from './NoDocumentsPopUp';
import { useQuery } from '@tanstack/react-query';
import { LoadingPage } from '@/components/common/components/LoadingPage';

export function StudentPersonalDataBlock({ userId }: { userId: string }) {
  const { data: userData, isLoading } = useQuery({
    queryKey: ['personal-data', userId],
    queryFn: () => PersonalDataApi.getPersonalData(userId),
    select: (data) => data.data,
    throwOnError: true,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!userData || !userData.entrantData) {
    return <NoPersonalDataPopUp />;
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='m-5 flex flex-col'>
          <ProfileHeader className='mb-3' label='Особисті дані' />
          <div className='sm:rounded-sm sm:bg-gray-50 sm:p-5 sm:shadow-lg'>
            <h2 className='text-xl font-normal'>
              {`${userData.lastName} ${userData.firstName} ${userData.middleName ?? ''}`}
            </h2>
            <div className='mt-3 flex flex-col gap-3 text-sm font-light'>
              <h6>Номер телефону: {userData.entrantData.phoneNumber}</h6>
              <h6>Електронна пошта: {userData.entrantData.email}</h6>
              <h6>
                Номер паспорту: {userData.entrantData.passportSeries}{' '}
                {userData.entrantData.passportNumber}
              </h6>
              <h6>Дата видачі: {userData.entrantData.passportDate}</h6>
              <h6>Ким видано: {userData.entrantData.passportInstitute}</h6>
              <h6>РНОКПП: {userData.entrantData.idCode}</h6>
              <h6>
                Місце реєстрації:{' '}
                {(userData.entrantData.region === null
                  ? ''
                  : userData.entrantData.region + ', ') +
                  userData.entrantData.settlement +
                  ', ' +
                  userData.entrantData.address +
                  ', ' +
                  userData.entrantData.index}
              </h6>
            </div>
          </div>
        </div>
        <div className='flex w-auto flex-col sm:flex-row'>
          <StudentRepresentativeBlock
            representativeData={userData.representativeData}
          />
          <StudentPayerBlock payerData={userData.customerData} />
        </div>
        <NoDocumentsPopUp contracts={userData.contracts} />
      </div>
    </>
  );
}
