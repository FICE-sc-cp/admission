'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import {
  TPersonalDataSchema,
  PersonalDataSchema,
} from '@/lib/schemas/personal-data.schemas';
import { usePersonalDataContext } from '@/lib/contexts/PersonalDataContext';
import { convertToPersonalData } from '../utils/convertToPersonalData';
import { BaseForm } from '@/components/pages/entrant/personal-data/components/BaseForm';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';

const RepresentativePage: FC = () => {
  const { representativeData, setRepresentativeData, setActiveStep } =
    usePersonalDataContext();

  const { toastSuccess } = useCommonToast();

  const form = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    defaultValues: {
      ...(representativeData ?? {}),
    },
    mode: 'onChange',
  });

  const onSubmit = (data: TPersonalDataSchema) => {
    const personalData = convertToPersonalData(data);
    setRepresentativeData(personalData);
    toastSuccess('Дані законного представника збережено!');
    setActiveStep((prevState) => prevState + 1);
  };

  return <BaseForm form={form} onSubmit={onSubmit} />;
};

export default RepresentativePage;
