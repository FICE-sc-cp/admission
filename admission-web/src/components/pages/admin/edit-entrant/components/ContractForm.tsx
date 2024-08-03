import React, { FC, useEffect, useState } from 'react';
import {
  DocumentsApiBody,
  Priorities,
} from '@/app/api/documents/documents-api.types';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
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
  AdminDocumentsSchema,
  TAdminDocumentsSchema,
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
import { TPriorities } from '@/lib/types/documents.types';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';

interface ContractFormProps {
  data: DocumentsApiBody;
  number: number;
  entrantFirstName: string;
  entrantMiddleName: string | null;
  entrantLastName: string;
}

export const ContractForm: FC<ContractFormProps> = ({
  data,
  number,
  entrantMiddleName,
  entrantFirstName,
  entrantLastName,
}) => {
  const { toastSuccess, toastError } = useCommonToast();

  const form = useForm<TAdminDocumentsSchema>({
    resolver: zodResolver(AdminDocumentsSchema),
    defaultValues: {
      ...(data as TAdminDocumentsSchema),
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

  const { user } = useAuth();

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [prioritiesData, setPrioritiesData] = useState<TPriorities[] | null>(
    null
  );

  const onSubmit = async (documents: TAdminDocumentsSchema) => {
    if (
      !isUniquePriorities(prioritiesData as TPriorities[]) ||
      !data.priorities
    ) {
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
          {
            ...(documents as DocumentsApiBody),
          },
          data.id as string
        );
        toastSuccess(`Зміни збережено!`);
        // location.reload();
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
      location.reload();
    } catch {
      toastError('Щось пішло не так!');
    }
  };

  const downloadDocuments = async () => {
    const res = await DocumentsApi.downloadContract(data.id as string);

    downloadFile(
      res.data,
      `${entrantLastName} ${entrantFirstName} ${entrantMiddleName ?? ''}`,
      data,
      'Навчання'
    );

    if (data.fundingSource === 'CONTRACT') {
      const res = await DocumentsApi.downloadPayment(data.id as string);

      downloadFile(
        res.data,
        `${entrantLastName} ${entrantFirstName} ${entrantMiddleName ?? ''}`,
        data,
        'Оплата'
      );
    }

    if (data.specialty === '121' || data.specialty === '126') {
      const res = await DocumentsApi.downloadPriority(data.id as string);

      downloadFile(
        res.data,
        `${entrantLastName} ${entrantFirstName} ${entrantMiddleName ? entrantMiddleName : ''}`,
        data,
        'Приорітети'
      );
    }
  };

  const approvePriority = async () => {
    try {
      await DocumentsApi.updateDocument(
        { priorityState: 'APPROVED' } as DocumentsApiBody,
        data.id as string
      );
      toastSuccess(`Пріоритети договору №${number} підтверджено!`);
      location.reload();
    } catch {
      toastError('Щось пішло не так!');
    }
  };

  useEffect(() => {
    if (specialty === '123') {
      form.setValue('priorities', []);
    }
    if (degree === EducationalDegree.MASTER) {
      if (educationalProgram) {
        form.setValue(
          'specialty',
          educationalProgram.split(' ')[0] as '121' | '123' | '126'
        );
      }

      form.setValue('priorities', []);
    }
    if (fundingSource === 'BUDGET') {
      form.setValue('paymentType', null);
    }
    if (degree === 'BACHELOR') {
      form.setValue('educationalProgram', null);
      form.setValue('programType', EducationalProgramType.PROFESSIONAL);
    }
  }, [degree, fundingSource, educationalProgram, specialty]);

  useEffect(() => {
    setPrioritiesData(priorities as TPriorities[]);
  }, [priorities]);

  console.log(priorities);

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
                    value={field.value as string}
                    onChange={field.onChange}
                    disabled={data.state === DocumentState.APPROVED}
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
                    placeholder='01.08.2024'
                    className='w-[320px] md:w-[350px]'
                    value={field.value as string}
                    onChange={field.onChange}
                    disabled={data.state === DocumentState.APPROVED}
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
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={data.state === DocumentState.APPROVED}
                >
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
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={data.state === DocumentState.APPROVED}
                >
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
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={data.state === DocumentState.APPROVED}
                >
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
          {fundingSource === FundingSource.CONTRACT && (
            <FormField
              control={form.control}
              name='paymentType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип оплати</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value as string}
                    disabled={data.state === DocumentState.APPROVED}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Вибери зі списку' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='QUARTERLY'>Щорічно</SelectItem>
                      <SelectItem value='SEMESTERLY'>Щосеместрово</SelectItem>
                      {studyForm !== StudyForm.PART_TIME && (
                        <SelectItem value='MONTHLY'>Щомісячно</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {degree !== EducationalDegree.MASTER && (
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
                      disabled={data.state === DocumentState.APPROVED}
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
          {specialty === '121' && degree !== EducationalDegree.MASTER && (
            //@ts-ignore
            <PriorityForm
              priorityState={data.priorityState}
              educationalPrograms={IPeduPrograms}
              form={form}
            />
          )}
          {specialty === '126' && degree !== EducationalDegree.MASTER && (
            //@ts-ignore
            <PriorityForm
              priorityState={data.priorityState}
              educationalPrograms={ISTeduPrograms}
              form={form}
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value as string}
                        disabled={data.state === DocumentState.APPROVED}
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
              {programType && (
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
                          disabled={data.state === DocumentState.APPROVED}
                        >
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Вибери зі списку' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {programType ===
                                EducationalProgramType.PROFESSIONAL &&
                                PROFESSIONAL.map((program) => (
                                  <SelectItem key={program} value={program}>
                                    {program}
                                  </SelectItem>
                                ))}
                              {programType ===
                                EducationalProgramType.SCIENTIFIC &&
                                SCIENTIFIC.map((program) => (
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
              className='w-[350px]'
              type='button'
              onClick={downloadDocuments}
            >
              Завантажити
            </Button>
            <Button
              onClick={approvePriority}
              type='button'
              className={`w-[350px] ${
                data.priorityState === DocumentState.APPROVED ||
                !data.priorities ||
                data.specialty === '123'
                  ? 'hidden'
                  : ''
              } `}
            >
              Схвалити пріоритети
            </Button>
            <Button type='submit' className='w-[350px]'>
              Зберегти зміни
            </Button>
            <Button
              type='button'
              className='w-[350px]'
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
