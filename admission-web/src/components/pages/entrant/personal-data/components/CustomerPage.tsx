'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { regions } from '@/lib/constants/personal-data-select';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import {
  TPersonalDataSchema,
  PersonalDataSchema,
} from '@/lib/schemas/personal-data.schemas';
import { PersonalData } from '@/lib/types/entrant.types';
import { usePersonalDataContext } from '@/lib/contexts/PersonalDataContext';
import { BaseForm } from '@/components/pages/entrant/personal-data/components/BaseForm';
import { useToast } from '@/components/ui/toast/use-toast';

const CustomerPage: FC = () => {
  const { customerData, setCustomerData, activeStep, setActiveStep } =
    usePersonalDataContext();

  const { toast } = useToast();

  const form = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    //@ts-ignore
    defaultValues: customerData !== null ? customerData : {},
  });

  const onSubmit = (data: TPersonalDataSchema) => {
    setCustomerData(data as PersonalData);
    toast({
      title: 'Дані платника збережено!',
      variant: 'success',
    });
    setActiveStep((prevState) => prevState + 1);
  };

  return <BaseForm form={form} onSubmit={onSubmit} />;
};

export default CustomerPage;
