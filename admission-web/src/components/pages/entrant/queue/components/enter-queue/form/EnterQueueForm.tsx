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
import { QueueUser } from '@/lib/types/queue.types';

interface EnterQueueProps {
  userId: string;
  setIsUserAllowed: (value: boolean) => void;
  setData: (data: QueueUser | null) => void;
}

export const EnterQueueForm: FC<EnterQueueProps> = ({
  userId,
  setIsUserAllowed,
  setData,
}) => {
  const { refresh, push, replace } = useRouter();
  const form = useForm<TEnterQueueForm>({
    resolver: zodResolver(enterQueueFormSchema),
    defaultValues: {
      isDorm: false,
      printedEdbo: false,
      confirmedStudyPlace: false,
      phone: '',
      expectedSpecialities: '',
    },
  });

  const onSubmit = async (data: TEnterQueueForm) => {
    try {
      await queueApi.addUser(userId, data);
      setData((await queueApi.getUser(userId)).data);
      refresh();
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
                <Checkbox onChange={field.onChange} id='isDorm' />
                <FormLabel className='text-sm font-normal' htmlFor='isDorm'>
                  Планую селитися
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
                <Checkbox onChange={field.onChange} id='isDorm' />
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
                <Checkbox onChange={field.onChange} id='confirmedStudyPlace' />
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
            onClick={() => setIsUserAllowed(false)}
            variant='outline'
            className='w-full'
          >
            Скасувати
          </Button>
        </form>
      </Form>
    </div>
  );
};
