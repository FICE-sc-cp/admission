import React, { FC, useEffect, useState } from 'react';
import {
  DocumentsApiBody,
  State,
} from '@/app/api/documents/documents-api.types';
import { useForm } from 'react-hook-form';
import {
  AdminDocumentsSchema,
  TAdminDocumentsSchema,
} from '@/lib/schemas-and-types/documents';
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
import {
  PROFESSIONAL,
  SCIENTIFIC,
} from '@/lib/constants/documents-educational-programs';
import { Separator } from '@/components/ui/separator';
import PriorityForm from '@/app/(application)/documents/_components/PriorityForm';
import {
  IPeduPrograms,
  ISTeduPrograms,
} from '@/lib/constants/priority-select-values';
import DocumentsApi from '@/app/api/documents/documents-api';
import { DeletePopup } from '@/app/(application)/admin/entrants/[userId]/_components/DeletePopup';
import useAuth from '@/hooks/useAuth';

interface ContractFormProps {
  data: DocumentsApiBody;
  number: number;
}

export const ContractForm: FC<ContractFormProps> = ({ data, number }) => {
  const form = useForm<TAdminDocumentsSchema>({
    resolver: zodResolver(AdminDocumentsSchema),
    defaultValues: {
      ...(data as TAdminDocumentsSchema),
    },
  });

  const { user } = useAuth();

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const onSubmit = async (documents: TAdminDocumentsSchema) => {
    await DocumentsApi.updateDocument(
      { state: 'APPROVED', ...documents } as DocumentsApiBody,
      data.id as string
    );
    location.reload();
  };

  const deleteContract = async () => {
    await DocumentsApi.deleteDocument(data.id as string);
    location.reload();
  };

  const downloadDocuments = async () => {
    const res = await DocumentsApi.downloadContract(data.id as string);

    const blob = new Blob([res.data], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    const url = window.URL.createObjectURL(blob);

    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute(
      'download',
      `${user?.lastName} ${user?.firstName} ${user?.middleName} ${data.specialty} Навчання`
    );

    document.body.appendChild(tempLink);
    tempLink.click();

    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(url);

    if (data.fundingSource === 'CONTRACT') {
      const res = await DocumentsApi.downloadPayment(data.id as string);

      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      const url = window.URL.createObjectURL(blob);

      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute(
        'download',
        `${user?.lastName} ${user?.firstName} ${user?.middleName} ${data.specialty} Оплата`
      );

      document.body.appendChild(tempLink);
      tempLink.click();

      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    }

    if (data.specialty === '121' || data.specialty === '126') {
      const res = await DocumentsApi.downloadPriority(data.id as string);

      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      const url = window.URL.createObjectURL(blob);

      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute(
        'download',
        `${user?.lastName} ${user?.firstName} ${user?.middleName} ${data.specialty} Пріоритетка`
      );

      document.body.appendChild(tempLink);
      tempLink.click();

      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (form.getValues('specialty') === '123') {
      form.setValue('priorities', []);
    }
    if (form.getValues('degree') === 'MASTER') {
      //@ts-ignore
      if (form.getValues('educationalProgram')) {
        //@ts-ignore
        form.setValue(
          'specialty',
          //@ts-ignore
          form.getValues('educationalProgram').split(' ')[0]
        );
      }

      form.setValue('priorities', []);
    }
    if (form.getValues('fundingSource') === 'BUDGET') {
      form.setValue('paymentType', null);
    }
    if (form.getValues('degree') === 'BACHELOR') {
      form.setValue('educationalProgram', null);
      form.setValue('programType', 'PROFESSIONAL');
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
          title={`Видалити договір ${number}`}
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
                    <SelectItem value='BACHELOR'>Бакалавр</SelectItem>
                    <SelectItem value='MASTER'>Магістр</SelectItem>
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
                    <SelectItem value='BUDGET'>Бюджет</SelectItem>
                    <SelectItem value='CONTRACT'>Контракт</SelectItem>
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
                    <SelectItem value='FULL_TIME'>Денна</SelectItem>
                    <SelectItem value='PART_TIME'>Заочна</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.getValues('fundingSource') === 'CONTRACT' && (
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
                      <SelectItem value='MONTHLY'>Щомісячно</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.getValues('degree') !== 'MASTER' && (
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
            form.getValues('degree') !== 'MASTER' && (
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
            form.getValues('degree') !== 'MASTER' && (
              <PriorityForm educationalPrograms={IPeduPrograms} form={form} />
            )}
          {form.getValues('specialty') === '126' &&
            form.getValues('degree') !== 'MASTER' && (
              <PriorityForm educationalPrograms={ISTeduPrograms} form={form} />
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value as string}
                        className='flex flex-col space-y-1'
                      >
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Вибери зі списку' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='PROFESSIONAL'>
                              Професійна
                            </SelectItem>
                            <SelectItem value='SCIENTIFIC'>Наукова</SelectItem>
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
                          value={field.value as string}
                          className='flex flex-col space-y-1'
                        >
                          <FormItem className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Вибери зі списку' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {form.getValues('programType') ===
                                'PROFESSIONAL' &&
                                PROFESSIONAL.map((program) => (
                                  <SelectItem key={program} value={program}>
                                    {program}
                                  </SelectItem>
                                ))}
                              {form.getValues('programType') === 'SCIENTIFIC' &&
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
              className='w-[360px]'
              type='button'
              onClick={downloadDocuments}
            >
              Завантажити
            </Button>
            <Button
              onClick={() => onSubmit(form.getValues())}
              className='w-[360px]'
              disabled={data.state === State.APPROVED}
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
