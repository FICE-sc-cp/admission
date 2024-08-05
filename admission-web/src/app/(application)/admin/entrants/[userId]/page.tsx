'use client';

import React, { useState } from 'react';
import PersonalData from '@/app/api/personal-data/personal-data';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  TPersonalDataSchema,
  PersonalDataSchema,
} from '@/lib/schemas/personal-data.schemas';
import { ContractForm } from '@/components/pages/admin/edit-entrant/components/ContractForm';
import { DeletePopup } from '@/components/pages/admin/edit-entrant/components/DeletePopup';
import { PersonalForm } from '@/components/pages/admin/edit-entrant/components/PersonalForm';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import PersonalDataApi from '@/app/api/personal-data/personal-data';
import { useQuery } from '@tanstack/react-query';
import { LoadingPage } from '@/components/common/components/LoadingPage';
import { convertToPersonalDataInAdmin } from '@/components/pages/entrant/personal-data/utils/convertToPersonalDataInAdmin';
import { personalDataEmptyValues } from '@/lib/constants/personalDataEmptyValues';

const Page = () => {
  const { toastSuccess, toastError } = useCommonToast();
  const { push } = useRouter();
  const { userId } = useParams<{ userId: string }>();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const { data: personalData, isLoading } = useQuery({
    queryKey: ['personal-data', userId],
    enabled: !!userId,
    queryFn: () => PersonalDataApi.getPersonalData(userId),
    throwOnError: true,
    select: (data) => data.data,
  });

  const entrantForm = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    values: personalData?.entrantData && {
      ...personalData.entrantData,
      firstName: personalData.firstName,
      lastName: personalData.lastName,
      middleName: personalData.middleName,
      oldPassportTemplate: !!personalData.entrantData.passportSeries,
    },
    mode: 'onChange',
    defaultValues: personalDataEmptyValues,
  });

  const representativeForm = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    values: personalData?.representativeData && {
      ...personalData.representativeData,
      oldPassportTemplate: !!personalData.representativeData.passportSeries,
    },
    defaultValues: personalDataEmptyValues,
    mode: 'onChange',
  });

  const customerForm = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    values: personalData?.customerData && {
      ...personalData.customerData,
      oldPassportTemplate: !!personalData.customerData.passportSeries,
    },
    defaultValues: personalDataEmptyValues,
    mode: 'onChange',
  });

  const deleteEntrant = async () => {
    await PersonalData.deletePersonalData(userId);
    push('/');
  };

  const onSubmit = async (
    entrantData: TPersonalDataSchema,
    representativeData: TPersonalDataSchema,
    customerData: TPersonalDataSchema
  ) => {
    try {
      const personalData = convertToPersonalDataInAdmin(
        entrantData,
        representativeData,
        customerData
      );
      await PersonalData.updatePersonalData(personalData, userId);
      toastSuccess('Дані оновлено!');
      push(`/admin/entrants/${userId}`);
    } catch {
      toastError('Щось пішло не так!');
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main className='flex flex-1 flex-col gap-3 p-6'>
      {showDeletePopup && (
        <DeletePopup
          popupController={setShowDeletePopup}
          deleteFunc={deleteEntrant}
          title='Видалення вступника'
          text='Ви впевнені, що хочете видалити вступика? Вспупник буде видалений разом із всіма його документами, цю дію неможливо буде відмінити!'
        />
      )}

      <div className='flex flex-row justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-2xl font-semibold'>
            {`${personalData?.lastName} ${personalData?.firstName} ${personalData?.middleName ?? ''}`}
          </p>
          <p className='text-sm'> </p>
        </div>

        <div className='flex flex-row gap-3'>
          <Button variant='outline' onClick={() => setShowDeletePopup(true)}>
            Видалити вступника
          </Button>
          <Button
            onClick={() =>
              onSubmit(
                entrantForm.getValues(),
                representativeForm.getValues(),
                customerForm.getValues()
              )
            }
          >
            Зберегти зміни
          </Button>
        </div>
      </div>
      <Separator orientation='horizontal' className='w-full bg-violet-500' />
      <div className='flex flex-row gap-4'>
        <PersonalForm form={entrantForm} title={'Особисті дані'} />
        <PersonalForm
          form={representativeForm}
          title={'Законний представник'}
        />
        <PersonalForm form={customerForm} title={'Платник'} />
      </div>
      <div className='flex w-full flex-row items-center'>
        <p className='w-[170px] text-sm text-violet-500'>Заповнені договори</p>
        <Separator orientation='horizontal' className='shrink bg-violet-500' />
      </div>
      <div className='flex flex-row flex-wrap gap-4'>
        {personalData?.contracts &&
          personalData?.contracts.map((contract, index) => (
            <ContractForm
              key={contract.id}
              data={contract}
              number={index + 1}
              entrantFirstName={personalData.firstName}
              entrantLastName={personalData.lastName}
              entrantMiddleName={personalData.middleName}
            />
          ))}
      </div>
    </main>
  );
};

export default Page;
