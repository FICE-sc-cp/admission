import LoginForm from '@/app/(auth)/components/login-form';

const SignInPage: React.FC = () => {
  return (
    <section className='space z-20 flex w-full min-w-[300px] flex-1 -translate-y-[25px] flex-col justify-between overflow-y-hidden rounded-[30px] bg-white align-middle lg:max-w-[840px]'>
      <LoginForm />
    </section>
  );
};

export default SignInPage;
