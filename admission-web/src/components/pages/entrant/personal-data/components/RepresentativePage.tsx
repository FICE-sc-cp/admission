'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import useAuth from '@/lib/hooks/useAuth';
import {
  TPersonalDataSchema,
  PersonalDataSchema,
} from '@/lib/schemas/personal-data.schemas';
import { usePersonalDataContext } from '@/lib/contexts/PersonalDataContext';
import { BaseForm } from '@/components/pages/entrant/personal-data/components/BaseForm';
import { useToast } from '@/components/ui/toast/use-toast';

const RepresentativePage: FC = () => {
  const { representativeData, setRepresentativeData, setActiveStep } =
    usePersonalDataContext();

  const { toast } = useToast();

  const form = useForm<TPersonalDataSchema>({
    resolver: zodResolver(PersonalDataSchema),
    //@ts-ignore
    defaultValues: representativeData !== null ? representativeData : {},
  });

  const { user } = useAuth();

  const onSubmit = (data: TPersonalDataSchema) => {
    setRepresentativeData(data);
    toast({
      title: 'Дані законного представника збережено!',
      variant: 'success',
    });
    setActiveStep((prevState) => prevState + 1);
  };

  return <BaseForm form={form} onSubmit={onSubmit} />;
};

export default RepresentativePage;
