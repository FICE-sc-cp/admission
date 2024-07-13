const SideSection = () => {
  return (
    <section className='hidden h-full flex-1 flex-col justify-between lg:flex'>
      <div className="flex h-full flex-1 flex-col justify-end rounded-[30px] bg-[url('/images/photo-kpi.jpg')] bg-cover bg-center px-[32px] pb-[93px]">
        <h1 className='text-[48px] font-[600] text-white'>Привіт, вступник!</h1>
        <p className='text-white'>
          Цей сайт створений для абітурієнтів Факультету інформаційно
          обчислювальної техніки при КПІ ім. Сікорського
        </p>
      </div>
    </section>
  );
};

export default SideSection;
