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
import { UseFormReturn } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { TPersonalDataSchema } from '@/lib/schemas/personal-data.schemas';
import { RegionExceptions, regions } from '@/lib/constants/regions';

interface PersonalFormProps {
  title: string;
  onSubmit: () => void;
  form: UseFormReturn<TPersonalDataSchema, any, undefined>;
}

export const PersonalForm: FC<PersonalFormProps> = ({
  title,
  onSubmit,
  form,
}) => {
  const isOldPassport = form.watch('oldPassportTemplate');
  const region = form.watch('region');

  return (
    <div className='flex flex-col gap-3'>
      <p className='text-xl font-semibold'>{title}</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full max-w-[360px] flex-col items-center gap-6 md:items-start'
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
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Прізвище</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Прізвище'
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
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ім’я</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ім’я'
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
                name='middleName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>По батькові</FormLabel>
                    <FormControl>
                      <Input
                        disabled={field.value === null}
                        placeholder='По батькові'
                        className='w-[320px] md:w-[350px]'
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
                      className='w-[320px] md:w-[350px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-full flex-row items-center gap-3'>
              <p className='text-sm text-violet-500'>Паспортні дані</p>
              <Separator
                orientation='horizontal'
                className='w-[240px] bg-violet-500'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-row gap-3'>
                {isOldPassport && (
                  <FormField
                    control={form.control}
                    name='passportSeries'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Серія паспорту</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Серія'
                            className={'w-[100px]'}
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
                          className={
                            isOldPassport
                              ? 'w-[200px] md:w-[230px]'
                              : 'w-[320px] md:w-[350px]'
                          }
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
              name='passportInstitute'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Орган, що видав паспорт</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Орган видачі'
                      className='w-[320px] md:w-[350px]'
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
                        placeholder='0000000000'
                        className='w-[320px] md:w-[350px]'
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
                    defaultValue={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className='w-[320px] md:w-[360px]'>
                        <SelectValue placeholder={field.value ?? ''} />
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
            {region !== RegionExceptions.Kyiv &&
              region !== RegionExceptions.Sevastopol && (
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
                          value={field.value ?? ''}
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
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адреса</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='вул. Янгеля, буд. 5, кв. 102'
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
              name='index'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Поштовий індекс</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='12345'
                      className='w-[320px] md:w-[350px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
