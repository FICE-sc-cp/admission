'use client';

import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PersonalDataApi from '@/app/api/personal-data/personal-data';
import useAuth from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import SubmitPopup from './SubmitPopup';
import { usePersonalDataContext } from '@/lib/contexts/PersonalDataContext';

const SubmitPage: FC = () => {
  const {
    entrantData,
    representativeData,
    customerData,
    setActiveStep,
    activeStep,
  } = usePersonalDataContext();

  const [showPopup, setShowPopup] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const { user } = useAuth();
  const { push } = useRouter();

  const onSubmit = async () => {
    if (entrantData?.submission_in_corpus) {
      setShowPopup(true);
    }
    await PersonalDataApi.updatePersonalData(
      {
        email: user?.email || '',
        firstName: user?.firstName || '',
        middleName: user?.middleName || '',
        lastName: user?.lastName || '',
        role: user?.role || '',
        entrantData: {
          passportDate: entrantData?.passportDate || '',
          passportInstitute: entrantData?.passportInstitute || '',
          email: entrantData?.email || '',
          idCode: entrantData?.idCode || '',
          address: entrantData?.address || '',
          passportNumber: entrantData?.passportNumber || '',
          index: entrantData?.index || '',
          passportSeries: entrantData?.passportSeries || '',
          phoneNumber: entrantData?.phoneNumber || '',
          region: entrantData?.region || '',
          settlement: entrantData?.settlement || '',
        },
        customerData: customerData
          ? {
              passportDate: customerData?.passportDate || '',
              passportInstitute: customerData?.passportInstitute || '',
              email: customerData?.email || '',
              idCode: customerData?.idCode || '',
              address: customerData?.address || '',
              passportNumber: customerData?.passportNumber || '',
              index: customerData?.index || '',
              passportSeries: customerData?.passportSeries || '',
              phoneNumber: customerData?.phoneNumber || '',
              region: customerData?.region || '',
              settlement: customerData?.settlement || '',
              firstName: customerData?.firstName || '',
              middleName: customerData?.middleName || '',
              lastName: customerData?.lastName || '',
            }
          : null,
        representativeData: representativeData
          ? {
              passportDate: representativeData?.passportDate || '',
              passportInstitute: representativeData?.passportInstitute || '',
              email: representativeData?.email || '',
              idCode: representativeData?.idCode || '',
              address: representativeData?.address || '',
              passportNumber: representativeData?.passportNumber || '',
              index: representativeData?.index || '',
              passportSeries: representativeData?.passportSeries || '',
              phoneNumber: representativeData?.phoneNumber || '',
              region: representativeData?.region || '',
              settlement: representativeData?.settlement || '',
              firstName: representativeData?.firstName || '',
              middleName: representativeData?.middleName || '',
              lastName: representativeData?.lastName || '',
            }
          : null,
      },
      user?.id || ''
    );
    push('/');
  };
  return (
    <div className='flex flex-col gap-8'>
      {showPopup && (
        <SubmitPopup
          onSubmit={onSubmit}
          popupController={setShowPopup}
          adminCode={adminCode}
          adminCodeController={setAdminCode}
        />
      )}
      {entrantData && (
        <div className='mx-auto flex w-full max-w-[360px] flex-col items-start gap-3'>
          <div className='flex flex-row items-center gap-3'>
            <p className='text-sm text-violet-500'>Інформація про вступника</p>
            <Separator
              orientation='horizontal'
              className='w-[160px] bg-violet-500'
            />
          </div>
          <div className='flex flex-col gap-[5px]'>
            <p className='text-base'>
              Форма навчання: {entrantData.study_form}
            </p>
            <p className='text-base'>
              Номер телефону: {entrantData.phoneNumber}
            </p>
            <p className='text-base'>
              Номер паспорту: {entrantData?.passportSeries}{' '}
              {entrantData.passportNumber}
            </p>
            <p className='text-base'>Дата видачі: {entrantData.passportDate}</p>
            <p className='text-base'>
              Орган видачі: {entrantData.passportInstitute}
            </p>
            {entrantData.idCode && (
              <p className='text-base'>
                Індифікаційний код: {entrantData.idCode}
              </p>
            )}
            <p className='text-base'>Регіон: {entrantData.region}</p>
            <p className='text-base'>
              Населений пункт: {entrantData.settlement}
            </p>
            <p className='text-base'>Адреса: {entrantData.address}</p>
            <p className='text-base'>Поштовий індекс: {entrantData.index}</p>
          </div>
        </div>
      )}
      {representativeData && (
        <div className='mx-auto flex w-full max-w-[360px] flex-col items-start gap-3'>
          <div className='flex flex-row items-center gap-3'>
            <p className='text-sm text-violet-500'>
              Інформація про законного представника
            </p>
            <Separator
              orientation='horizontal'
              className='w-[160px] bg-violet-500'
            />
          </div>
          <div className='flex flex-col gap-[5px]'>
            <p className='text-base'>
              ПІБ: {representativeData.lastName} {representativeData.firstName}{' '}
              {representativeData?.middleName}
            </p>
            <p className='text-base'>
              Номер телефону: {representativeData.phoneNumber}
            </p>
            <p className='text-base'>
              Номер паспорту: {representativeData?.passportSeries}{' '}
              {representativeData.passportNumber}
            </p>
            <p className='text-base'>
              Дата видачі: {representativeData.passportDate}
            </p>
            <p className='text-base'>
              Орган видачі: {representativeData.passportInstitute}
            </p>
            {representativeData.idCode && (
              <p className='text-base'>
                Індифікаційний код: {representativeData.idCode}
              </p>
            )}
            <p className='text-base'>Регіон: {representativeData.region}</p>
            <p className='text-base'>
              Населений пункт: {representativeData.settlement}
            </p>
            <p className='text-base'>Адреса: {representativeData.address}</p>
            <p className='text-base'>
              Поштовий індекс: {representativeData.index}
            </p>
          </div>
        </div>
      )}
      {customerData && (
        <div className='mx-auto flex w-full max-w-[360px] flex-col items-start gap-3'>
          <div className='flex flex-row items-center gap-3'>
            <p className='text-sm text-violet-500'>Інформація про платника</p>
            <Separator
              orientation='horizontal'
              className='w-[160px] bg-violet-500'
            />
          </div>
          <div className='flex flex-col gap-[5px]'>
            <p className='text-base'>
              ПІБ: {customerData.lastName} {customerData.firstName}{' '}
              {customerData?.middleName}
            </p>
            <p className='text-base'>
              Номер телефону: {customerData.phoneNumber}
            </p>
            <p className='text-base'>
              Номер паспорту: {customerData?.passportSeries}{' '}
              {customerData.passportNumber}
            </p>
            <p className='text-base'>
              Дата видачі: {customerData.passportDate}
            </p>
            <p className='text-base'>
              Орган видачі: {customerData.passportInstitute}
            </p>
            {customerData.idCode && (
              <p className='text-base'>
                Індифікаційний код: {customerData.idCode}
              </p>
            )}
            <p className='text-base'>Регіон: {customerData.region}</p>
            <p className='text-base'>
              Населений пункт: {customerData.settlement}
            </p>
            <p className='text-base'>Адреса: {customerData.address}</p>
            <p className='text-base'>Поштовий індекс: {customerData.index}</p>
          </div>
        </div>
      )}
      <div className='flex flex-row gap-4'>
        <Button className='w-[200px]' onClick={onSubmit}>
          Схвалити
        </Button>
        <Button
          onClick={() => setActiveStep((prevState) => activeStep - 1)}
          variant='outline'
          className='w-[160px]'
        >
          Назад
        </Button>
      </div>
    </div>
  );
};

export default SubmitPage;
