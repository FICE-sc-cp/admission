'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import {
  TPersonalDataSchema,
  PersonalDataSchema,
} from '@/lib/schemas/personal-data.schemas';
import { usePersonalDataContext } from '@/lib/contexts/PersonalDataContext';
import { BaseForm } from '@/components/pages/entrant/personal-data/components/BaseForm';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { convertToPersonalData } from '../utils/convertToPersonalData';

const CustomerPage: FC = () => {
  const { customerData, setCustomerData, activeStep, setActiveStep } =
    usePersonalDataContext();

  const { toastSuccess } = useCommonToast();

  const form = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    defaultValues: customerData !== null ? customerData : {},
  });
  const [adminCode, setAdminCode] = useState('');

  const onSubmit = (data: TPersonalDataSchema) => {
    const personalData = convertToPersonalData(data);
    setCustomerData(personalData);
    toastSuccess('Дані платника збережено!');
    setActiveStep((prevState) => prevState + 1);
  };

  return <BaseForm form={form} onSubmit={onSubmit} />;
};

export default CustomerPage;
