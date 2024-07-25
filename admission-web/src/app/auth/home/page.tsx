import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function MainPage() {
  return (
    <section className='relative h-full min-h-screen'>
      <Image
        className='z-0 h-full w-full bg-cover object-cover md:hidden'
        src='/images/photo-kpi-mobile.jpg'
        alt='img'
        width={360}
        height={210}
      />
      <div className='relative -top-5 flex h-full flex-col rounded-t-3xl bg-white px-5 pb-4 pt-7 md:items-center md:bg-transparent'>
        <h1 className='mb-4 text-center text-3xl font-semibold'>
          Привіт, вступник!
        </h1>
        <p className='mb-7 text-center text-sm'>
          Цей сайт створений для абітурієнтів Факультету інформаційно
          обчислювальної техніки при КПІ ім. Сікорського
        </p>
        <Link href='/auth/sign-in'>
          <Button className='mb-[10px] w-full'>Вхід</Button>
        </Link>
        <Link href='/auth/sign-up'>
          <Button variant='outline' className='w-full'>
            Реєстрація
          </Button>
        </Link>
      </div>
    </section>
  );
}
