'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignInSchema, TSignIn } from '@/lib/schemas-and-types/auth';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authApi } from '@/app/api/auth/auth-api';

import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';

export const LoginForm = () => {
  const { toastError } = useCommonToast();
  const { push } = useRouter();
  const form = useForm<TSignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: TSignIn) {
    try {
      await authApi.login(values);
      push('/auth/email?email=' + values.email);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        form.setError(
          'email',
          { message: 'Користувача з таким email не існує' },
          { shouldFocus: true }
        );
      } else {
        toastError('Спробуйте ще раз пізніше', undefined);
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

        <Button
          type='submit'
          className='w-full'
          disabled={form.formState.isSubmitting}
        >
          Увійти
        </Button>
      </form>
    </Form>
  );
};
