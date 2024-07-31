'use client';
import { ProfileHeader } from '@/app/(application)/_components/student-profile-page/ProfileHeader';
import PersonalDataApi from '@/app/api/personal-data/personal-data';
import { useEffect, useState } from 'react';
import { Loader } from '@/app/(application)/_components/Loader';
import { GetPersonalData } from '@/app/api/personal-data/personal-data-type';
import { NoPersonalDataPopUp } from '@/app/(application)/_components/student-profile-page/NoPersonalDataPopUp';
import { StudentRepresentativeBlock } from '@/app/(application)/_components/student-profile-page/StudentRepresentativeBlock';
import { StudentPayerBlock } from '@/app/(application)/_components/student-profile-page/StudentPayerBlock';
import { NoDocumentsPopUp } from '@/app/(application)/_components/student-profile-page/NoDocumentsPopUp';

export function StudentPersonalDataBlock({ userId }: { userId: string }) {
  const [userData, setUserData] = useState<GetPersonalData>(
    {} as GetPersonalData
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getUserPersonalData = async () => {
    try {
      const { data } = await PersonalDataApi.getPersonalData(userId);
      setUserData(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserPersonalData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error || userData.entrantData === null) {
    return <NoPersonalDataPopUp />;
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='m-5 flex flex-col'>
          <ProfileHeader className='mb-3' label='Особисті дані' />
          <div className='sm:rounded-sm sm:bg-gray-50 sm:p-5 sm:shadow-lg'>
            <h2 className='text-xl font-normal'>
              {userData.lastName +
                ' ' +
                userData.firstName +
                ' ' +
                userData.middleName}
            </h2>
            <div className='mt-3 flex flex-col gap-3 text-sm font-light'>
              <h6>Номер телефону: {userData.phone}</h6>
              <h6>Електронна пошта: {userData.email}</h6>
              <h6>Номер паспорту: {userData.entrantData.passportNumber}</h6>
              <h6>Дата видачі: {userData.entrantData.passportDate}</h6>
              <h6>Орган видачі: {userData.entrantData.passportInstitute}</h6>
              <h6>Ідентифікаційний код: {userData.entrantData.idCode}</h6>
              <h6>
                Місце реєстрації:{' '}
                {userData.entrantData.region +
                  ',' +
                  userData.entrantData.settlement +
                  ',' +
                  userData.entrantData.address}
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
