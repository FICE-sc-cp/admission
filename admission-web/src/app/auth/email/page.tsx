import { Info, MailOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  searchParams: {
    email: string;
  };
}

const EmailPage: FC<Props> = ({ searchParams: { email } }) => {
  return (
    <div className='flex -translate-y-10 flex-col items-center justify-center gap-6 rounded-3xl bg-white px-6 py-5 text-center lg:px-5'>
      <MailOpen size={44} />
      <div>
        <h1 className='mb-2 text-2xl font-semibold'>Перевір свою пошту</h1>
        <p className='text-sm'>
          Ми надіслали одноразове посилання на поштову адресу {email}
        </p>
      </div>
      <div className='flex items-center gap-[8px] rounded-[8px] bg-violet-400 p-[12px]'>
        <Info size={16} color='white' />
        <p className='text-sm text-white'>Лист для входу діє 2 години</p>
      </div>
      <Button variant='outline' className='hidden lg:block'>
        <Link className='w-full' href='/auth/sign-in'>
          Повернутися до сторінки входу
        </Link>
      </Button>
    </div>
  );
};

export default EmailPage;
