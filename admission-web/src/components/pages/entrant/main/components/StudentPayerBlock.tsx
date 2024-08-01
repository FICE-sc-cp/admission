import { Representative } from '@/app/api/personal-data/personal-data-type';
import { ProfileHeader } from './ProfileHeader';

export function StudentPayerBlock({
  payerData,
}: {
  payerData: Representative;
}) {
  if (payerData === null) {
    return <></>;
  } else {
    return (
      <div className='m-5 flex flex-col sm:w-1/2'>
        <ProfileHeader className='mb-3' label='Платник' />
        <div className='sm:rounded-sm sm:bg-gray-50 sm:p-5 sm:shadow-lg'>
          <h2 className='text-xl font-normal'>
            {payerData.lastName +
              ' ' +
              payerData.firstName +
              ' ' +
              payerData.middleName}
          </h2>
          <div className='mt-3 flex flex-col gap-3 text-sm font-light'>
            <h6>Номер телефону: {payerData.phoneNumber}</h6>
            <h6>Електронна пошта: {payerData.email}</h6>
            <h6>Номер паспорту: {payerData.passportNumber}</h6>
            <h6>Дата видачі: {payerData.passportDate}</h6>
            <h6>Орган видачі: {payerData.passportInstitute}</h6>
            <h6>Ідентифікаційний код: {payerData.idCode}</h6>
            <h6>
              Місце реєстрації:{' '}
              {payerData.region +
                ',' +
                payerData.settlement +
                ',' +
                payerData.address}
            </h6>
          </div>
        </div>
      </div>
    );
  }
}
