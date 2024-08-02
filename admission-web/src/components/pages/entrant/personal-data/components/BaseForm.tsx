'use client';
import React, { FC, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { TPersonalDataSchema } from '@/lib/schemas/personal-data.schemas';
import { usePersonalDataContext } from '@/lib/contexts/PersonalDataContext';
import { regions } from '@/lib/constants/regions';

interface BaseFormProps {
  form: UseFormReturn<TPersonalDataSchema, any, undefined>;
  onSubmit: (data: TPersonalDataSchema) => void;
}

export const BaseForm: FC<BaseFormProps> = ({ form, onSubmit }) => {
  const [adminCode, setAdminCode] = useState('');
  const { activeStep, setActiveStep } = usePersonalDataContext();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto flex w-full max-w-[360px] flex-col items-center gap-6 md:items-start'
      >
        <div className='flex flex-col items-center gap-4 md:items-start'>
          <div className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пошта</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='example@example.com'
                      className='w-[320px] md:w-[360px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ім’я</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Ім’я'
                      className='w-[320px] md:w-[360px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Прізвище</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Прізвище'
                      className='w-[320px] md:w-[360px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='middleName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>По батькові</FormLabel>
                  <FormControl>
                    <Input
                      disabled={field.value === null}
                      placeholder='По батькові'
                      className='w-[320px] md:w-[360px]'
                      value={field.value === null ? '' : field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className='flex flex-row items-center gap-2'>
                    <Checkbox
                      checked={field.value === null}
                      onCheckedChange={() =>
                        field.onChange({
                          target: { value: field.value !== null ? null : '' },
                        })
                      }
                    />
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      Немає по батькові
                    </label>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Номер телефону</FormLabel>
                <FormControl>
                  <Input
                    placeholder='+380 000 000 00'
                    className='w-[320px] md:w-[360px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-3'>
            <div className='flex flex-row gap-3'>
              {form.getValues('oldPassportTemplate') && (
                <FormField
                  control={form.control}
                  name='passportSeries'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Серія паспорту</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Серія'
                          className={'w-[120px]'}
                          value={field.value as string}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name='passportNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номер паспорту</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Номер паспорту'
                        className={`${form.getValues('oldPassportTemplate') ? 'w-[200px] md:w-[240px]' : 'w-[320px] md:w-[360px]'} `}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='oldPassportTemplate'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center gap-2 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Старий зразок паспорту</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='passportDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Дата видачі паспорту</FormLabel>
                <FormControl>
                  <Input
                    placeholder='17.11.2022'
                    className='w-[320px] md:w-[360px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passportInstitute'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Орган, що видав паспорт</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Орган видачі'
                    className='w-[320px] md:w-[360px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='idCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>РНОКПП</FormLabel>
                  <FormControl>
                    <Input
                      disabled={field.value === null}
                      placeholder='РНОКПП'
                      className='w-[320px] md:w-[360px]'
                      value={field.value === null ? '' : field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className='flex flex-row items-center gap-2'>
                    <Checkbox
                      checked={field.value === null}
                      onCheckedChange={() =>
                        field.onChange({
                          target: { value: field.value !== null ? null : '' },
                        })
                      }
                    />
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      Відсутній РНОКПП
                    </label>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='region'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Регіон</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-[320px] md:w-[360px]'>
                      <SelectValue placeholder='Вибери зі списку' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='settlement'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Населений пункт</FormLabel>
                <FormControl>
                  <Input
                    placeholder='м. Київ'
                    className='w-[320px] md:w-[360px]'
                    value={field.value as string}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Адреса</FormLabel>
                <FormControl>
                  <Input
                    placeholder='вул. Академіка Янгеля 20'
                    className='w-[320px] md:w-[360px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='index'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Поштовий індекс</FormLabel>
                <FormControl>
                  <Input
                    placeholder='12345'
                    className='w-[320px] md:w-[360px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem className='flex flex-col items-center md:items-start'>
            <FormLabel>Код адміністратора</FormLabel>
            <Input
              placeholder=''
              className='w-[320px] md:w-[360px]'
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
            />
            <FormDescription className='text-center text-xs md:text-start'>
              Якщо ви ввели всі дані правильно, але система видає помилку,
              підійдіть до волонтера для перевірки
            </FormDescription>
            <FormMessage />
          </FormItem>
        </div>
        <div className='flex gap-4'>
          <Button
            className='w-[160px] md:w-[180px]'
            onClick={() => {
              if (adminCode === '000') {
                onSubmit(form.getValues());
                setAdminCode('');
              } else {
                form.handleSubmit(onSubmit);
              }
            }}
          >
            Далі
          </Button>
          <Button
            className='w-[160px] md:w-[180px]'
            onClick={() => {
              setActiveStep((prevState) => activeStep - 1);
            }}
            variant='outline'
          >
            Назад
          </Button>
        </div>
      </form>
    </Form>
  );
};
