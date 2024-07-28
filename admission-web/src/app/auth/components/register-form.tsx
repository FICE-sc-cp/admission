'use client';
import { authApi } from '@/app/api/auth/auth-api';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignUpSchema, TSignUp } from '@/lib/schemas-and-types/auth';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';

export const RegisterForm = () => {
  const { push } = useRouter();
  const form = useForm<TSignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      middleName: '',
    },
  });
  async function onSubmit(values: TSignUp) {
    try {
      await authApi.register(values);
      push('/auth/email');
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        return form.setError('email', {
          type: 'manual',
          message: 'Користувач з такою поштою вже існує',
        });
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full max-w-[440px] flex-col gap-5'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-normal'>Email</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-normal'>Ім&apos;я</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-normal'>Прізвище</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='middleName'
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={`text-sm font-normal ${field.value === null && 'opacity-60'}`}
              >
                По-батькові
              </FormLabel>
              <Input
                disabled={field.value === null}
                value={field.value === null ? '' : field.value}
                onChange={field.onChange}
              />
              <FormMessage />
              <div className='my-2 flex items-center gap-2'>
                <Checkbox
                  checked={field.value === null}
                  onCheckedChange={() =>
                    field.onChange({
                      target: { value: field.value !== null ? null : '' },
                    })
                  }
                />
                <label
                  htmlFor='terms1'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Немає по-батькові
                </label>
              </div>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full'
          disabled={form.formState.isSubmitting}
        >
          Зареєструватись
        </Button>
      </form>
    </Form>
  );
};
