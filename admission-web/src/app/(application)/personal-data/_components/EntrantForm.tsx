'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  EntrantSchema,
  TEntrantSchema,
} from '@/schemas-and-types/personal-data/personal-data';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { FC, useEffect, useState } from 'react';
import { usePersonalDataContext } from '$/admission-web/contexts/PersonalDataContext';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { regions } from '@/constants/personal-data-select';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';

const EntrantForm: FC = () => {
  const [isContract, setIsContract] = useState(true);
  const {
    isAdult,
    isAnotherPayer,
    setIsAdult,
    setIsAnotherPayer,
    setEntrantData,
    entrantData,
    setActiveStep,
  } = usePersonalDataContext();

  const [adminCode, setAdminCode] = useState('');
  const form = useForm<TEntrantSchema>({
    resolver: zodResolver(EntrantSchema),
    defaultValues: entrantData !== null ? entrantData : {},
  });

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      form.setValue('userId', user.id);
      form.setValue('email', user.email);
    }
  }, [user]);

  const onSubmit = (data: z.infer<TEntrantSchema>) => {
    console.log(data);
    setEntrantData(data);
    setActiveStep(2);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto flex w-full max-w-[360px] flex-col items-start'
      >
        <div className='flex flex-col gap-[24px]'>
          <FormField
            control={form.control}
            name='study_form'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel className='text-base'>
                  Вступаю на форму навчання
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (value === 'Бюджет') {
                        setIsContract(false);
                        setIsAnotherPayer(false);
                      } else {
                        setIsContract(true);
                      }
                    }}
                    defaultValue='Контракт'
                    className='flex flex-col'
                  >
                    <FormItem className='flex items-center gap-[8px] space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Бюджет' />
                      </FormControl>
                      <FormLabel className='text-sm'>Бюджет</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center gap-[8px] space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Контракт' />
                      </FormControl>
                      <FormLabel className='text-sm'>Контракт</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-[10px]'>
            <div className='flex flex-row items-center gap-[8px] space-y-0'>
              <Checkbox
                checked={isAdult}
                onCheckedChange={(value) => {
                  setIsAdult(!!value);
                }}
              />
              <FormLabel className='text-sm'>Є 18 років</FormLabel>
            </div>

            {isContract && (
              <div className='flex flex-row items-center gap-[8px] space-y-0'>
                <Checkbox
                  checked={isAnotherPayer}
                  onCheckedChange={(value) => {
                    setIsAnotherPayer(!!value);
                  }}
                />
                <FormLabel className='max-w-[327px] text-sm'>
                  Інший платник
                </FormLabel>
              </div>
            )}
            <FormField
              control={form.control}
              name='submission_in_corpus'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center gap-[8px] space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className='text-sm'>
                    Подача документів в корпусі
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator
            className='w-[360px] bg-slate-300'
            orientation='horizontal'
          />
        </div>

        <div className='mt-6 flex flex-col gap-4'>
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
                          {...field}
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
                      placeholder='Індифікаційний код'
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
                    {...field}
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
          <FormItem>
            <FormLabel>Код адміністратора</FormLabel>
            <Input
              placeholder=''
              className='w-[320px] md:w-[360px]'
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
            />
            <FormDescription className='text-xs'>
              Якщо ви ввели всі дані правильно, але система видає помилку,
              підійдіть до волонтера для перевірки
            </FormDescription>
            <FormMessage />
          </FormItem>
        </div>
        <Button
          className='mt-7 w-full'
          onClick={() => {
            if (adminCode === '000') {
              onSubmit(form.getValues());
            } else {
              form.handleSubmit(onSubmit);
            }
          }}
        >
          Далі
        </Button>
      </form>
    </Form>
  );
};

export default EntrantForm;
