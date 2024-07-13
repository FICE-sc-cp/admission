import { Button } from '@/components/ui/button';
import Link from 'next/link';

const MainPage = () => {
  return (
    <section className='space flex w-full min-w-[300px] flex-1 -translate-y-[25px] flex-col overflow-y-hidden rounded-[30px] bg-white px-[20px] pb-[36px] pt-[40px] text-center align-middle'>
      <h1 className='mb-[16px] text-[28px] font-semibold'>Привіт, вступник!</h1>
      <p className='mb-[28px] text-[14px]'>
        Цей сайт створений для абітурієнтів Факультету інформаційно
        обчислювальної техніки при КПІ ім. Сікорського
      </p>
      <Link href='/sign-in'>
        <Button className='mb-[10px] w-full'>Вхід</Button>
      </Link>
      <Link href={'/sign-up'}>
        <Button variant='outline' className='w-full'>
          Реєстрація
        </Button>
      </Link>
    </section>
  );
};

export default MainPage;
