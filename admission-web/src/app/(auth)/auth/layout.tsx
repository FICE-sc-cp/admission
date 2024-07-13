import { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="grid h-full w-screen place-content-center bg-[url('/images/photo-kpi-mobile.jpg')] bg-cover bg-center px-[20px] lg:bg-[url('/images/photo-kpi.jpg')]">
      {children}
    </section>
  );
};

export default AuthLayout;
