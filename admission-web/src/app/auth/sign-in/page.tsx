import { LoginForm } from '@/components/pages/auth/sign-in/components/login-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SignInPage: React.FC = () => {
  return (
    <section className='z-20 flex w-full min-w-80 flex-1 -translate-y-8 flex-col justify-between overflow-y-hidden rounded-3xl bg-white align-middle lg:max-w-[840px]'>
      <div className='flex h-full flex-col items-center justify-start px-5 pb-4 pt-7 lg:justify-center'>
        <h1 className='text-blue mb-5 text-4xl font-semibold'>Вхід</h1>
        <LoginForm />
        <p className='mb-4 mt-32'>Не маєш акаунту?</p>
        <Button variant='outline' className='font-semibold'>
          <Link href='/auth/sign-up'>Зареєструватись</Link>
        </Button>
      </div>
    </section>
  );
};

export default SignInPage;
