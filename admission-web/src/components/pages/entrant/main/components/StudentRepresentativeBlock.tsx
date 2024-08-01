import { Representative } from '@/app/api/personal-data/personal-data-type';
import { ProfileHeader } from './ProfileHeader';

export function StudentRepresentativeBlock({
  representativeData,
}: {
  representativeData: Representative;
}) {
  if (representativeData === null) {
    return <></>;
  } else {
    return (
      <div className='m-5 flex flex-col sm:w-1/2'>
        <ProfileHeader className='mb-3' label='Законний представник' />
        <div className='sm:rounded-sm sm:bg-gray-50 sm:p-5 sm:shadow-lg'>
          <h2 className='text-xl font-normal'>
            {representativeData.lastName +
              ' ' +
              representativeData.firstName +
              ' ' +
              representativeData.middleName}
          </h2>
          <div className='mt-3 flex flex-col gap-3 text-sm font-light'>
            <h6>Номер телефону: {representativeData.phoneNumber}</h6>
            <h6>Електронна пошта: {representativeData.email}</h6>
            <h6>Номер паспорту: {representativeData.passportNumber}</h6>
            <h6>Дата видачі: {representativeData.passportDate}</h6>
            <h6>Орган видачі: {representativeData.passportInstitute}</h6>
            <h6>Ідентифікаційний код: {representativeData.idCode}</h6>
            <h6>
              Місце реєстрації:{' '}
              {representativeData.region +
                ',' +
                representativeData.settlement +
                ',' +
                representativeData.address}
            </h6>
          </div>
        </div>
      </div>
    );
  }
}
