'use client';

import { FilePenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface NoContractProps {
  show: boolean;
}

const NoContract = ({ show }: NoContractProps) => {
  const { push } = useRouter();
  if (show) {
    return (
      <div className='m-auto flex h-auto w-[320px] flex-col items-center justify-center gap-[16px] border-[1px] border-violet-300 bg-violet-50 px-[28px] py-[20px] md:w-fit'>
        <FilePenLine className='h-12 w-12' />
        <p className='text-center text-xl'>
          Заповніть договір, щоб обрати приорітети
        </p>
        <Button onClick={() => push('/contract')} size='default'>
          Перейти до заповнення договору
        </Button>
      </div>
    );
  }
  return null;
};

export default NoContract;
