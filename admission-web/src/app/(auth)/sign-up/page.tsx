import RegisterForm from '@/app/(auth)/components/register-form';

const SignUpPage: React.FC = () => {
  return (
    <section className='space flex w-full min-w-[300px] flex-1 -translate-y-[25px] flex-col justify-between rounded-[30px] bg-white align-middle lg:order-first lg:max-w-[840px]'>
      <RegisterForm />
    </section>
  );
};

export default SignUpPage;
