'use client';

import React, { useEffect, useState } from 'react';
import { PersonaForm } from '@/app/(application)/admin/entrants/[userId]/_components/PersonaForm';
import PersonalData from '@/app/api/personal-data/personal-data';
import useAuth from '@/hooks/useAuth';
import { GetPersonalData } from '@/app/api/personal-data/personal-data-type';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import {
  PersonalDataSchema,
  TPersonalDataSchema,
} from '@/lib/schemas-and-types/personal-data/personal-data';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeletePopup } from '@/app/(application)/admin/entrants/[userId]/_components/DeletePopup';

const Page = () => {
  const { user } = useAuth();
  const [personalData, setPersonalData] = useState<GetPersonalData | null>(
    null
  );
  const params = useParams<{ userId: string }>();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const entrantForm = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    values: {
      ...personalData?.entrantData,
      firstName: personalData?.firstName,
      lastName: personalData?.lastName,
      middleName: personalData?.middleName || null,
      idCode: personalData?.entrantData.idCode || null,
      oldPassportTemplate: personalData?.entrantData.passportSeries
        ? true
        : false,
    },
  });

  const representativeForm = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    values: {
      ...personalData?.representativeData,
      firstName: personalData?.representativeData.firstName,
      lastName: personalData?.representativeData.lastName,
      middleName: personalData?.representativeData.middleName || null,
      idCode: personalData?.representativeData.idCode || null,
      oldPassportTemplate: personalData?.representativeData.passportSeries
        ? true
        : false,
    },
  });

  const customerForm = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    values: {
      ...personalData?.customerData,
      firstName: personalData?.customerData.firstName,
      lastName: personalData?.customerData.lastName,
      middleName: personalData?.customerData.middleName || null,
      idCode: personalData?.customerData.idCode || null,
      oldPassportTemplate: personalData?.customerData.passportSeries
        ? true
        : false,
    },
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
    await PersonalData.updatePersonalData(
      {
        email: personalData?.email,
        firstName: personalData?.firstName,
        middleName: personalData?.middleName,
        lastName: personalData?.lastName,
        role: personalData?.role,
        entrantData: {
          userId: entrantData?.userId || '',
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
              userId: customerData.userId || '',
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
              userId: representativeData.userId || '',
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
      personalData?.id
    );
    console.log(entrantData, 'entrant');
    console.log(representativeData, 'representative');
    console.log(customerData, 'customer');
  };

  useEffect(() => {
    fetchPersonalData();
  }, []);

  console.log(entrantForm.getValues());
  return (
    <main className='flex flex-1 flex-col gap-3 p-6'>
      {showDeletePopup && (
        <DeletePopup
          popupController={setShowDeletePopup}
          deleteEntrant={deleteEntrant}
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
    </main>
  );
};

export default Page;
