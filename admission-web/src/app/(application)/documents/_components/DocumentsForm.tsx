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
import PriorityForm from '@/app/(application)/documents/_components/PriorityForm';
import {
  IPeduPrograms,
  ISTeduPrograms,
} from '@/lib/constants/priority-select-values';
import { getCurrentDate } from '@/lib/utils/getCurrentDate';
import { useEffect } from 'react';
import {
  PROFESSIONAL,
  SCIENTIFIC,
} from '@/lib/constants/documents-educational-programs';
import DocumentsApi from '@/app/api/documents/documents-api';
import useAuth from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
  TDocumentsSchema,
  DocumentsSchema,
} from '@/lib/schemas/documents.schemas';

export const DocumentsForm = () => {
  const form = useForm<TDocumentsSchema>({
    resolver: zodResolver(DocumentsSchema),
    defaultValues: {
      priorityDate: getCurrentDate(),
    },
  });

  const { push } = useRouter();

  const { user } = useAuth();

  const onSubmit = async (data: TDocumentsSchema) => {
    //@ts-ignore
    await DocumentsApi.createDocument({ ...data, userId: user?.id });
    push('/');
  };

  useEffect(() => {
    if (form.getValues('specialty') === '123') {
      form.setValue('priorities', null);
    }
    if (form.getValues('degree') === 'MASTER') {
      //@ts-ignore
      if (form.getValues('educationalProgram')) {
        //@ts-ignore
        form.setValue(
          'specialty',
          //@ts-ignore
          form.getValues('educationalProgram').split(' ')[0] as string
        );
      }

      form.setValue('priorities', null);
    }
    if (form.getValues('fundingSource') === 'BUDGET') {
      form.setValue('paymentType', null);
    }
    if (form.getValues('degree') === 'BACHELOR') {
      form.setValue('educationalProgram', null);
      form.setValue('programType', 'PROFESSIONAL');
    }
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
                      <RadioGroupItem value='BACHELOR' />
                    </FormControl>
                    <FormLabel>Бакалавр</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='MASTER' />
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
                      <RadioGroupItem value='BUDGET' />
                    </FormControl>
                    <FormLabel>Бюджет</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='CONTRACT' />
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
                      <RadioGroupItem value='FULL_TIME' />
                    </FormControl>
                    <FormLabel>Денна</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='PART_TIME' />
                    </FormControl>
                    <FormLabel>Заочна</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues('fundingSource') === 'CONTRACT' && (
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
                      <FormLabel>Щоквартально</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='SEMESTERLY' />
                      </FormControl>
                      <FormLabel>Щосеместрово</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
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
        {form.getValues('degree') === 'MASTER' && (
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
                          <RadioGroupItem value='PROFESSIONAL' />
                        </FormControl>
                        <FormLabel>Професійна</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='SCIENTIFIC' />
                        </FormControl>
                        <FormLabel>Наукова</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues('programType') && (
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
                        {form.getValues('programType') === 'PROFESSIONAL' &&
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
                        {form.getValues('programType') === 'SCIENTIFIC' &&
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
        {form.getValues('degree') !== 'MASTER' && (
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
        {form.getValues('specialty') === '121' &&
          form.getValues('degree') !== 'MASTER' && (
            <PriorityForm educationalPrograms={IPeduPrograms} form={form} />
          )}
        {form.getValues('specialty') === '126' &&
          form.getValues('degree') !== 'MASTER' && (
            <PriorityForm educationalPrograms={ISTeduPrograms} form={form} />
          )}
        <Button
          onClick={() => onSubmit(form.getValues())}
          className='w-full md:w-[185px]'
        >
          Надіслати договір
        </Button>
      </form>
    </Form>
  );
};
