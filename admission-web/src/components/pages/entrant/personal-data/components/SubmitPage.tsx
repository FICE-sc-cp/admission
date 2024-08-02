'use client';

import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PersonalDataApi from '@/app/api/personal-data/personal-data';
import useAuth from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import SubmitPopup from './SubmitPopup';
import { usePersonalDataContext } from '@/lib/contexts/PersonalDataContext';
import { FundingSourceLabels } from '@/lib/constants/fundingSourceLabels';
import { FundingSource } from '$/utils/src/enums/FundingSourceEnum';
import { useToast } from '@/components/ui/toast/use-toast';

const SubmitPage: FC = () => {
  const { toast } = useToast();

  const {
    entrantData,
    representativeData,
    customerData,
    setActiveStep,
    activeStep,
    isContract,
    isSubmittingInCorpus,
  } = usePersonalDataContext();

  const [showPopup, setShowPopup] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const { user } = useAuth();
  const { push } = useRouter();

  const onSubmit = async () => {
    if (isSubmittingInCorpus) {
      setShowPopup(true);
    }
    try {
      await PersonalDataApi.updatePersonalData(
        {
          ...user!,
          entrantData,
          customerData,
          representativeData,
        },
        user!.id
      );
      toast({
        title: 'Особисті дані оновлено!',
        variant: 'success',
      });
      push('/');
    } catch {
      toast({
        variant: 'destructive',
        title: 'Щось пішло не так!',
        description:
          'Спробуйте ще раз або зверніться за допомогою до волонтерів.',
      });
    }
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
              Форма навчання:{' '}
              {
                FundingSourceLabels[
                  isContract ? FundingSource.CONTRACT : FundingSource.CONTRACT
                ]
              }
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
              <p className='text-base'>РНОКПП: {entrantData.idCode}</p>
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
              <p className='text-base'>РНОКПП: {representativeData.idCode}</p>
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
              <p className='text-base'>РНОКПП: {customerData.idCode}</p>
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
        <Button
          className='w-[200px]'
          onClick={() => {
            if (isSubmittingInCorpus) {
              setShowPopup(true);
            } else {
              onSubmit();
            }
          }}
        >
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
