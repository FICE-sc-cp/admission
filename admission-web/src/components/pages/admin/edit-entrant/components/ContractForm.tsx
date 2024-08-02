import React, { FC, useEffect, useState } from 'react';
import { DocumentsApiBody } from '@/app/api/documents/documents-api.types';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { getCurrentDate } from '@/lib/utils/getCurrentDate';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import DocumentsApi from '@/app/api/documents/documents-api';
import useAuth from '@/lib/hooks/useAuth';
import { downloadFile } from '@/lib/utils/downloadFile';
import {
  TAdminDocumentsSchema,
  AdminDocumentsSchema,
} from '@/lib/schemas/documents.schemas';
import { DeletePopup } from './DeletePopup';
import PriorityForm from '@/components/pages/entrant/documents/components/PriorityForm';
import {
  IPeduPrograms,
  ISTeduPrograms,
  PROFESSIONAL,
  SCIENTIFIC,
} from '@/lib/constants/educational-programs';
import { Separator } from '@/components/ui/separator';
import { EducationalProgramType } from '$/utils/src/enums/EducationalProgramTypeEnum';
import { DocumentState } from '$/utils/src/enums/DocumentStateEnum';
import { EducationalDegree } from '$/utils/src/enums/EducationalDegreeEnum';
import { FundingSource } from '$/utils/src/enums/FundingSourceEnum';
import { StudyForm } from '$/utils/src/enums/StudyFormEnum';
import { isUniquePriorities } from '@/lib/utils/isUnique';
import { useRouter } from 'next/navigation';
import { TPriorities } from '@/lib/types/documents.types';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';

interface ContractFormProps {
  data: DocumentsApiBody;
  number: number;
}

export const ContractForm: FC<ContractFormProps> = ({ data, number }) => {
  const { toastSuccess, toastError } = useCommonToast();
  const { push } = useRouter();

  const form = useForm<TAdminDocumentsSchema>({
    resolver: zodResolver(AdminDocumentsSchema),
    defaultValues: {
      ...(data as TAdminDocumentsSchema),
    },
    mode: 'onChange',
  });

  const { user } = useAuth();

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [prioritiesData, setPrioritiesData] = useState<TPriorities[] | null>(
    null
  );

  const onSubmit = async (documents: TAdminDocumentsSchema) => {
    setPrioritiesData(form.getValues('priorities') as TPriorities[]);
    if (!isUniquePriorities(prioritiesData as TPriorities[])) {
      if (prioritiesData) {
        for (let i = 0; i < prioritiesData.length; i++) {
          form.setError(`priorities.${i}`, {
            type: 'required',
            message: 'Приорітети мають бути унікальними!',
          });
        }
      }

      return;
    } else {
      try {
        await DocumentsApi.updateDocument(
          { state: 'APPROVED', ...documents } as DocumentsApiBody,
          data.id as string
        );
        toastSuccess(`Договір ${number} підтверджено!`);
        push(`/admin/entrants/${user?.id as string}`);
      } catch {
        toastError('Щось пішло не так!');
      }
    }
  };

  const deleteContract = async () => {
    try {
      await DocumentsApi.deleteDocument(data.id as string);
      toastSuccess(`Договір №${number} видалено!`);
      setShowDeletePopup(false);
      push(`/admin/entrants/${user?.id as string}`);
    } catch {
      toastError('Щось пішло не так!');
    }
  };

  const downloadDocuments = async () => {
    const res = await DocumentsApi.downloadContract(data.id as string);

    downloadFile(res.data, user, data, 'Навчання');

    if (data.fundingSource === 'CONTRACT') {
      const res = await DocumentsApi.downloadPayment(data.id as string);

      downloadFile(res.data, user, data, 'Оплата');
    }

    if (data.specialty === '121' || data.specialty === '126') {
      const res = await DocumentsApi.downloadPriority(data.id as string);

      downloadFile(res.data, user, data, 'Приорітети');
    }
  };

  useEffect(() => {
    if (form.getValues('specialty') === '123') {
      form.setValue('priorities', []);
    }
    const educationalProgram = form.getValues('educationalProgram');

    if (form.getValues('degree') === EducationalDegree.MASTER) {
      if (educationalProgram) {
        form.setValue(
          'specialty',
          educationalProgram.split(' ')[0] as '121' | '123' | '126'
        );
      }

      form.setValue('priorities', []);
    }
    if (form.getValues('fundingSource') === 'BUDGET') {
      form.setValue('paymentType', null);
    }
    if (form.getValues('degree') === 'BACHELOR') {
      form.setValue('educationalProgram', null);
      form.setValue('programType', EducationalProgramType.PROFESSIONAL);
    }
  }, [form.getValues()]);

  useEffect(() => {
    form.setValue('priorities', []);
  }, [form.getValues('specialty')]);

  useEffect(() => {
    if (!data.date) {
      form.setValue('date', getCurrentDate());
    }
  }, []);

  return (
    <div className='flex flex-col gap-6'>
      {showDeletePopup && (
        <DeletePopup
          popupController={setShowDeletePopup}
          deleteFunc={deleteContract}
          title={`Видалити договір №${number}`}
          text='Дія є безповоротною, видалений договір не буде повернено'
        />
      )}

      <p className='text-xl font-semibold'>Договір №{number}</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex max-w-[350px] flex-col gap-6'
        >
          <FormField
            control={form.control}
            name='number'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Номер договору</FormLabel>
                <FormControl>
                  <Input
                    placeholder=''
                    className='w-[320px] md:w-[350px]'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Дата реєстрації договору</FormLabel>
                <FormControl>
                  <Input
                    placeholder=''
                    className='w-[320px] md:w-[350px]'
                    value={field.value}
                    disabled
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='degree'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Освітній рівень(бакалавр/магістр)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Вибери зі списку' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EducationalDegree.BACHELOR}>
                      Бакалавр
                    </SelectItem>
                    <SelectItem value={EducationalDegree.MASTER}>
                      Магістр
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='fundingSource'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Джелело фінансування</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Вибери зі списку' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={FundingSource.BUDGET}>Бюджет</SelectItem>
                    <SelectItem value={FundingSource.CONTRACT}>
                      Контракт
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='studyForm'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Форма навчання (денна/заочна)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Вибери зі списку' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={StudyForm.FULL_TIME}>Денна</SelectItem>
                    <SelectItem value={StudyForm.PART_TIME}>Заочна</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.getValues('fundingSource') === FundingSource.CONTRACT && (
            <FormField
              control={form.control}
              name='paymentType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип оплати</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value as string}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Вибери зі списку' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='QUARTERLY'>Щоквартально</SelectItem>
                      <SelectItem value='SEMESTERLY'>Щосеместрово</SelectItem>
                      {form.getValues('studyForm') !== StudyForm.PART_TIME && (
                        <SelectItem value='MONTHLY'>Щомісячно</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.getValues('degree') !== EducationalDegree.MASTER && (
            <>
              <FormField
                control={form.control}
                name='specialty'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Спеціальність</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value as string}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Вибери зі списку' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='121'>
                          121 Інженерія програмного забезпечення
                        </SelectItem>
                        <SelectItem value='123'>
                          123 Комп’ютерна інженерія
                        </SelectItem>
                        <SelectItem value='126'>
                          126 Інформаційні системи та технології
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className='bg-slate-300' orientation='horizontal' />
            </>
          )}
          {form.getValues('specialty') === '123' &&
            form.getValues('degree') !== EducationalDegree.MASTER && (
              <FormField
                control={form.control}
                name='priorityDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата заповнення</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=''
                        className='w-[320px] md:w-[350px]'
                        value={field.value}
                        disabled
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          {form.getValues('specialty') === '121' &&
            form.getValues('degree') !== EducationalDegree.MASTER && (
              //@ts-ignore
              <PriorityForm educationalPrograms={IPeduPrograms} form={form} />
            )}
          {form.getValues('specialty') === '126' &&
            form.getValues('degree') !== EducationalDegree.MASTER && (
              //@ts-ignore
              <PriorityForm educationalPrograms={ISTeduPrograms} form={form} />
            )}
          {form.getValues('degree') === EducationalDegree.MASTER && (
            <>
              <FormField
                control={form.control}
                name='programType'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>Тип освітньої програми</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value as string}
                      >
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Вибери зі списку' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem
                              value={EducationalProgramType.PROFESSIONAL}
                            >
                              Професійна
                            </SelectItem>
                            <SelectItem
                              value={EducationalProgramType.SCIENTIFIC}
                            >
                              Наукова
                            </SelectItem>
                          </SelectContent>
                        </FormItem>
                      </Select>
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ''}
                        >
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Вибери зі списку' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {form.getValues('programType') ===
                                EducationalProgramType.PROFESSIONAL &&
                                Object.keys(PROFESSIONAL).map((program) => (
                                  <SelectItem key={program} value={program}>
                                    {program}
                                  </SelectItem>
                                ))}
                              {form.getValues('programType') ===
                                EducationalProgramType.SCIENTIFIC &&
                                Object.keys(SCIENTIFIC).map((program) => (
                                  <SelectItem key={program} value={program}>
                                    {program}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </FormItem>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
          <div className='flex flex-col gap-3'>
            <Button
              className='w-[360px]'
              type='button'
              onClick={downloadDocuments}
              disabled={data.state !== DocumentState.APPROVED}
            >
              Завантажити
            </Button>
            <Button
              type='submit'
              className='w-[360px]'
              disabled={data.state === DocumentState.APPROVED}
            >
              Схвалити
            </Button>
            <Button
              type='button'
              className='w-[360px]'
              variant='outline'
              onClick={() => setShowDeletePopup(true)}
            >
              Видалити
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
