import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const DataAlreadyExist = () => {
  return (
    <div className='m-auto mt-[20%] flex flex-col items-center gap-4'>
      <Image src='/giphy-frog.gif' alt='frogs' width={286} height={160} />
      <div className='flex flex-col items-center gap-3'>
        <h3 className='text-center text-xl font-semibold'>
          Особисту інформацію вже заповнено
        </h3>
        <p className='text-md text-center'>
          Заповнену інформацію ви можете переглянути в профілі свого акаунту
        </p>
      </div>
      <Link href='/'>
        <Button className='w-fit'>До профілю</Button>
      </Link>
    </div>
  );
};

export default DataAlreadyExist;
