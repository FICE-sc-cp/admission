import { Info, MailOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const EmailPage = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.80)',
        }}
        className='flex max-w-[426px] flex-col items-center justify-center gap-[16px] rounded-[15px] px-[16px] py-[20px] text-center lg:px-[20px]'
      >
        <MailOpen size={44} />
        <div>
          <h1 className='mb-[10px] text-[24px] font-semibold'>
            Перевір свою пошту
          </h1>
          <p className='text-[14px]'>
            Ми надіслали одноразове посилання на адресу
            exapmle.exapmle@gmail.com
          </p>
        </div>
        <div className='flex items-center gap-[8px] rounded-[8px] bg-violet-400 p-[12px]'>
          <Info size={16} color='white' />
          <p className='text-[14px] text-white'>Лист для входу діє 2 години</p>
        </div>
        <Button variant='outline' className='hidden lg:block'>
          <Link className='w-full' href='/sign-in'>
            Повернутися до сторінки входу
          </Link>
        </Button>
      </div>
    </>
  );
};

export default EmailPage;
