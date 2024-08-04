'use client';

import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { queueApi } from '@/app/api/queue/queue-api';
import { isAxiosError } from 'axios';
import { QueueErorr } from '../../../types/QueueEntrant';
import {
  TEnterQueueForm,
  enterQueueFormSchema,
} from '@/lib/schemas/queue-entrant.schemas';
import { useQueryClient } from '@tanstack/react-query';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';

interface EnterQueueProps {
  userId: string;
  setIsUserAllowed: (value: boolean) => void;
  setSkipChecking: (skipChecking: boolean) => void;
}

export const EnterQueueForm: FC<EnterQueueProps> = ({
  userId,
  setIsUserAllowed,
  setSkipChecking,
}) => {
  const queryClient = useQueryClient();
  const { toastSuccess } = useCommonToast();
  const { push } = useRouter();
  const form = useForm<TEnterQueueForm>({
    resolver: zodResolver(enterQueueFormSchema),
    defaultValues: {
      isDorm: false,
      printedEdbo: false,
      confirmedStudyPlace: false,
      phone: '',
      expectedSpecialities: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: TEnterQueueForm) => {
    try {
      await queueApi.addUser(userId, data);
      toastSuccess('Ви успішно увійшли в чергу');
      await queryClient.refetchQueries({
        queryKey: ['queue-user-by-id', userId],
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          if (error.response.data.error === 'Already in queue') {
            return push('/queue/error?type=' + QueueErorr.ALREADY_IN_QUEUE);
          } else if (error.response.data.error === 'Queue is closed') {
            return push('/queue/error?type=' + QueueErorr.CLOSED);
          }
        }
      }
      return push('/queue/error');
    }
  };
  return (
    <div className='flex w-full max-w-96 flex-col gap-4 rounded-md border border-violet-300 bg-violet-50 px-6 py-5 shadow-md shadow-slate-600'>
      <h2 className='text-2xl font-semibold leading-6 text-black'>
        Реєстрація в черзі
      </h2>
      <p className='text-sm text-black'>
        Якщо ви хочете увійти до черги, вам необхідно бути не менше ніж за 2 км
        від точки реєстрації
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-1 flex-col items-start justify-start gap-3'
        >
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-sm font-normal'>
                  Номер телефону
                </FormLabel>
                <Input type='tel' placeholder='+380 12 345 6789' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='expectedSpecialities'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-sm font-normal'>
                  Спеціальності
                </FormLabel>
                <Input type='text' placeholder='121, 123, 126' {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isDorm'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2 space-y-0'>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id='isDorm'
                />
                <FormLabel className='text-sm font-normal' htmlFor='isDorm'>
                  Планую селитися в гуртожиток
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='printedEdbo'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2 space-y-0'>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id='printedEdbo'
                />
                <FormLabel
                  className='mt-0 text-sm font-normal'
                  htmlFor='printedEdbo'
                >
                  Роздрукована заява з ЄДЕБО
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmedStudyPlace'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2 space-y-0'>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id='confirmedStudyPlace'
                />
                <FormLabel
                  className='mt-0 text-sm font-normal'
                  htmlFor='confirmedStudyPlace'
                >
                  Підтвердив місце навчання в ЄДЕБО
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='mt-4 w-full'
            disabled={form.formState.isSubmitting}
          >
            Увійти в чергу
          </Button>
          <Button
            onClick={() => {
              setIsUserAllowed(false);
              setSkipChecking(false);
            }}
            variant='outline'
            type='button'
            className='w-full'
          >
            Скасувати
          </Button>
        </form>
      </Form>
    </div>
  );
};
