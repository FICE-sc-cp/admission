'use client';

import AuthApi from '@/lib/api/auth-api';
import { useForm } from 'react-hook-form';
import { login } from '@/app/(auth)/actions/login';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TSignUp } from '@/schemas-and-types/auth';

async function handleSignup(values: TSignUp) {
  await AuthApi.register(values);
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSignUp>();

  return (
    <div className='flex h-full flex-col items-center justify-start px-[20px] pb-[16px] pt-[28px] lg:justify-center'>
      <h1 className='text-blue mb-[20px] text-[36px] font-[600]'>Реєстрація</h1>
      <form
        className='flex w-full max-w-[440px] flex-col gap-[20px]'
        onSubmit={handleSubmit(handleSignup)}
      >
        <div>
          <label
            className='mb-[6px] self-start text-[14px] font-[500]'
            htmlFor='email'
          >
            Email
          </label>
          <Input className='w-full' {...register('email')} />
        </div>
        <div>
          <label
            className='mb-[6px] self-start text-[14px] font-[500]'
            htmlFor='firstname'
          >
            Ім&apos;я
          </label>
          <Input className='w-full' {...register('firstName')} />
        </div>
        <div>
          <label
            className='mb-[6px] self-start text-[14px] font-[500]'
            htmlFor='lastname'
          >
            Прізвище
          </label>
          <Input className='w-full' {...register('lastName')} />
        </div>
        <div>
          <label
            className='mb-[6px] self-start text-[14px] font-[500]'
            htmlFor='middlename'
          >
            По батькові
          </label>
          <Input className='w-full' {...register('middleName')} />
        </div>
        <Button className='w-full'>Зареєструватись</Button>
      </form>
      <p className='mb-[16px] mt-[90px] text-[16px] font-[400]'>
        Вже маєш акаунт?
      </p>
      <Button variant='outline' className='font-semibold'>
        <Link href='/sign-in'>Увійти</Link>
      </Button>
    </div>
  );
};

export default RegisterForm;
