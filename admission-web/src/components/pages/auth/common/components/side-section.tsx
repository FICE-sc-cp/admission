import Image from 'next/image';

export const SideSection = () => {
  return (
    <section className='relative hidden min-h-[80vh] flex-1 flex-col justify-between lg:flex'>
      <div className='absolute inset-0'>
        <Image
          src='/images/photo-kpi.jpg'
          alt='background image'
          fill
          className='z-0 rounded-3xl bg-cover bg-center object-cover'
        />
      </div>
      <div className='relative flex h-full flex-1 flex-col items-start justify-end gap-4 px-8 pb-24 text-white'>
        <h2 className='text-5xl font-semibold'>Привіт, вступник!</h2>
        <p>
          Цей сайт створений для абітурієнтів Факультету інформатики та
          обчислювальної техніки КПІ ім. Ігоря Сікорського
        </p>
      </div>
    </section>
  );
};
