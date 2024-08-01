'use client';

import React, { useEffect, useState } from 'react';
import PersonalData from '@/app/api/personal-data/personal-data';
import useAuth from '@/lib/hooks/useAuth';
import {
  GetPersonalData,
  PersonalDataBody,
} from '@/app/api/personal-data/personal-data-type';
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
import { PersonaForm } from '@/components/pages/admin/edit-entrant/components/PersonaForm';
import { useToast } from '@/components/ui/toast/use-toast';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';

const Page = () => {
  const { toastSuccess, toastError } = useCommonToast();
  const { push } = useRouter();

  const [personalData, setPersonalData] = useState<GetPersonalData | null>(
    null
  );
  const params = useParams<{ userId: string }>();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const entrantForm = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    values: {
      ...personalData?.entrantData,
      firstName: personalData?.firstName as string,
      lastName: personalData?.lastName as string,
      middleName: personalData?.middleName || null,
      idCode: personalData?.entrantData.idCode || null,
      oldPassportTemplate: personalData?.entrantData.passportSeries
        ? true
        : false,
    } as TPersonalDataSchema,
  });

  const representativeForm = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    values: {
      ...personalData?.representativeData,
      firstName: personalData?.representativeData.firstName as string,
      lastName: personalData?.representativeData.lastName as string,
      middleName: personalData?.representativeData.middleName || null,
      idCode: personalData?.representativeData.idCode || null,
      oldPassportTemplate: personalData?.representativeData.passportSeries
        ? true
        : false,
    } as TPersonalDataSchema,
  });

  const customerForm = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    values: {
      ...personalData?.customerData,
      firstName: personalData?.customerData.firstName as string,
      lastName: personalData?.customerData.lastName as string,
      middleName: personalData?.customerData.middleName || null,
      idCode: personalData?.customerData.idCode || null,
      oldPassportTemplate: personalData?.customerData.passportSeries
        ? true
        : false,
    } as TPersonalDataSchema,
  });

  async function fetchPersonalData() {
    const data = await PersonalData.getPersonalData(params.userId);
    setPersonalData(data.data);
  }
  const deleteEntrant = async () => {
    await PersonalData.deletePersonalData(params.userId);
  };

  const onSubmit = async (
    entrantData?: TPersonalDataSchema,
    representativeData?: TPersonalDataSchema,
    customerData?: TPersonalDataSchema
  ) => {
    try {
      await PersonalData.updatePersonalData(
        {
          email: entrantData?.email as string,
          firstName: entrantData?.firstName as string,
          middleName: entrantData?.middleName,
          lastName: entrantData?.lastName,
          role: personalData?.role,
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
        } as PersonalDataBody,
        personalData?.id as string
      );
      toastSuccess('Дані оновлено!');
      push(`/admin/entrants/${params.userId}`);
    } catch {
      toastError('Щось пішло не так!');
    }
  };

  useEffect(() => {
    fetchPersonalData();
  }, []);

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
            {personalData?.lastName} {personalData?.middleName}{' '}
            {personalData?.firstName}
          </p>
          <p className='text-sm'>{personalData?.expectedSpecialities}</p>
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
        <PersonaForm
          form={entrantForm}
          title={'Особисті дані'}
          onSubmit={onSubmit}
        />
        <PersonaForm
          form={representativeForm}
          title={'Законний представник'}
          onSubmit={onSubmit}
        />
        <PersonaForm
          form={customerForm}
          title={'Платник'}
          onSubmit={onSubmit}
        />
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
            />
          ))}
      </div>
    </main>
  );
};

export default Page;
