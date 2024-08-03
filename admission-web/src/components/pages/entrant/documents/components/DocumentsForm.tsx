'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { getCurrentDate } from '@/lib/utils/getCurrentDate';
import { useEffect, useState } from 'react';
import DocumentsApi from '@/app/api/documents/documents-api';
import useAuth from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
  TDocumentsSchema,
  DocumentsSchema,
} from '@/lib/schemas/documents.schemas';
import PriorityForm from './PriorityForm';
import {
  PROFESSIONAL,
  SCIENTIFIC,
  IPeduPrograms,
  ISTeduPrograms,
} from '@/lib/constants/educational-programs';
import { EducationalProgramType } from '$/utils/src/enums/EducationalProgramTypeEnum';
import { FundingSource } from '$/utils/src/enums/FundingSourceEnum';
import { TPriorities } from '@/lib/types/documents.types';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { isUniquePriorities } from '@/lib/utils/isUnique';
import { EducationalDegree } from '$/utils/src/enums/EducationalDegreeEnum';
import { StudyForm } from '$/utils/src/enums/StudyFormEnum';
import { DocumentsApiBody } from '@/app/api/documents/documents-api.types';

export const DocumentsForm = () => {
  const { toastError, toastSuccess } = useCommonToast();

  const form = useForm<TDocumentsSchema>({
    resolver: zodResolver(DocumentsSchema),
    defaultValues: {
      priorityDate: getCurrentDate(),
      priorities: [],
    },
    mode: 'onChange',
  });

  const educationalProgram = form.watch('educationalProgram');
  const specialty = form.watch('specialty');
  const degree = form.watch('degree');
  const fundingSource = form.watch('fundingSource');
  const priorities = form.watch('priorities');
  const programType = form.watch('programType');
  const studyForm = form.watch('studyForm');

  const [prioritiesData, setPrioritiesData] = useState<TPriorities[] | null>(
    null
  );

  const { push } = useRouter();

  const { user } = useAuth();

  const onSubmit = async (data: TDocumentsSchema) => {
    if (
      !isUniquePriorities(prioritiesData as TPriorities[]) ||
      !data.priorities
    ) {
      if (prioritiesData) {
        for (let i = 0; i < prioritiesData.length; i++) {
          form.setError(`priorities.${i}`, {
            type: 'required',
            message: 'Пріоритети мають бути унікальними!',
          });
        }
      }
      return;
    } else {
      try {
        await DocumentsApi.createDocument({
          ...data,
          userId: user!.id,
          priorities: data.priorities,
        } as DocumentsApiBody);
        push('/');
        toastSuccess('Договір успішно створений!');
      } catch {
        toastError('Щось пішло не так!');
      }
    }
  };

  useEffect(() => {
    if (
      specialty === '123' ||
      degree === EducationalDegree.MASTER ||
      (specialty === '121' && studyForm === StudyForm.PART_TIME)
    ) {
      form.setValue('priorities', []);
    }
    if (degree === EducationalDegree.MASTER) {
      if (educationalProgram) {
        form.setValue(
          'specialty',
          educationalProgram.split(' ')[0] as '121' | '123' | '126'
        );
      }
    }
    if (fundingSource === FundingSource.BUDGET) {
      form.setValue('paymentType', null);
    }
    if (degree === EducationalDegree.BACHELOR) {
      form.setValue('educationalProgram', null);
      form.setValue('programType', EducationalProgramType.PROFESSIONAL);
    }
  }, [specialty, degree, fundingSource, studyForm, educationalProgram]);

  useEffect(() => {
    setPrioritiesData(priorities as TPriorities[]);
  }, [form.getValues()]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        <FormField
          control={form.control}
          name='degree'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Освітній рівень(бакалавр/магістр)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={EducationalDegree.BACHELOR} />
                    </FormControl>
                    <FormLabel>Бакалавр</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={EducationalDegree.MASTER} />
                    </FormControl>
                    <FormLabel>Магістр</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='fundingSource'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Джелело фінансування</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={FundingSource.BUDGET} />
                    </FormControl>
                    <FormLabel>Бюджет</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={FundingSource.CONTRACT} />
                    </FormControl>
                    <FormLabel>Контракт</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='studyForm'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Форма навчання (денна/заочна)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={StudyForm.FULL_TIME} />
                    </FormControl>
                    <FormLabel>Денна</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={StudyForm.PART_TIME} />
                    </FormControl>
                    <FormLabel>Заочна</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fundingSource === FundingSource.CONTRACT && (
          <FormField
            control={form.control}
            name='paymentType'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Тип оплати</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value as string}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='QUARTERLY' />
                      </FormControl>
                      <FormLabel>Щорічно</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='SEMESTERLY' />
                      </FormControl>
                      <FormLabel>Щосеместрово</FormLabel>
                    </FormItem>
                    <FormItem
                      className={`${studyForm === StudyForm.PART_TIME ? 'hidden' : 'flex'} items-center space-x-3 space-y-0`}
                    >
                      <FormControl>
                        <RadioGroupItem value='MONTHLY' />
                      </FormControl>
                      <FormLabel>Щомісячно</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {degree === EducationalDegree.MASTER && (
          <>
            <FormField
              control={form.control}
              name='programType'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Тип освітньої програми</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value as string}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem
                            value={EducationalProgramType.PROFESSIONAL}
                          />
                        </FormControl>
                        <FormLabel>Професійна</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem
                            value={EducationalProgramType.SCIENTIFIC}
                          />
                        </FormControl>
                        <FormLabel>Наукова</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {programType && (
              <FormField
                control={form.control}
                name='educationalProgram'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>Освітня програма</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value as string}
                        className='flex flex-col space-y-1'
                      >
                        {programType === EducationalProgramType.PROFESSIONAL &&
                          PROFESSIONAL.map((program) => (
                            <FormItem
                              key={program}
                              className='flex items-center space-x-3 space-y-0'
                            >
                              <FormControl>
                                <RadioGroupItem value={program} />
                              </FormControl>
                              <FormLabel>{program}</FormLabel>
                            </FormItem>
                          ))}
                        {programType === EducationalProgramType.SCIENTIFIC &&
                          SCIENTIFIC.map((program) => (
                            <FormItem
                              key={program}
                              className='flex items-center space-x-3 space-y-0'
                            >
                              <FormControl>
                                <RadioGroupItem value={program} />
                              </FormControl>
                              <FormLabel>{program}</FormLabel>
                            </FormItem>
                          ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
        )}
        {degree !== EducationalDegree.MASTER && (
          <FormField
            control={form.control}
            name='specialty'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Спеціальність</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value as string}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='121' />
                      </FormControl>
                      <FormLabel>
                        121 Інженерія програмного забезпечення
                      </FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='123' />
                      </FormControl>
                      <FormLabel>123 Комп’ютерна інженерія</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='126' />
                      </FormControl>
                      <FormLabel>
                        126 Інформаційні системи та технології
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {specialty === '121' &&
          degree !== EducationalDegree.MASTER &&
          studyForm !== StudyForm.PART_TIME && (
            <PriorityForm educationalPrograms={IPeduPrograms} form={form} />
          )}
        {specialty === '126' && degree !== EducationalDegree.MASTER && (
          <PriorityForm educationalPrograms={ISTeduPrograms} form={form} />
        )}
        <Button type='submit' className='w-full md:w-[185px]'>
          Надіслати договір
        </Button>
      </form>
    </Form>
  );
};
