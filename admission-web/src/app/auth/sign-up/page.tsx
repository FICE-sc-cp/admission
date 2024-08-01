import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';
import { RegisterForm } from '../../../components/pages/auth/sign-up/components/register-form';

const SignUpPage: FC = () => {
  return (
    <section className='flex w-full min-w-72 flex-1 -translate-y-6 flex-col justify-between rounded-3xl bg-white align-middle lg:order-first lg:max-w-[840px]'>
      <div className='flex h-full flex-col items-center justify-start px-5 pb-4 pt-7 lg:justify-center'>
        <h1 className='text-blue mb-5 text-[36px] font-semibold'>Реєстрація</h1>
        <RegisterForm />
        <p className='mb-4 mt-24'>Вже маєш акаунт?</p>
        <Button variant='outline' className='font-semibold'>
          <Link href='/auth/sign-in'>Увійти</Link>
        </Button>
      </div>
    </section>
  );
};

export default SignUpPage;
