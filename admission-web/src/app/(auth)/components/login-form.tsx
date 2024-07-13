import { login } from '@/app/(auth)/actions/login';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LoginForm = () => {
  return (
    <div className='flex h-full flex-col items-center justify-start px-[20px] pb-[16px] pt-[28px] lg:justify-center'>
      <h1 className='text-blue mb-[20px] text-[36px] font-[600]'>Вхід</h1>
      <form
        className='flex w-full max-w-[440px] flex-col gap-[28px]'
        action={login}
      >
        <div>
          <label
            className='mb-[6px] self-start text-[14px] font-[500]'
            htmlFor='email'
          >
            Email
          </label>
          <Input className='w-full' name='email' />
        </div>
        <Button className='w-full'>Увійти</Button>
      </form>
      <p className='mb-[16px] mt-[120px] text-[16px] font-[400]'>
        Не маєш акаунту?
      </p>
      <Button variant='outline' className='font-semibold'>
        <Link href='/sign-up'>Зареєструватись</Link>
      </Button>
    </div>
  );
};

export default LoginForm;
