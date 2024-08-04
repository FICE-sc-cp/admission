import { Loader } from './Loader';

export function LoadingPage() {
  return (
    <div className='flex min-h-[90vh] w-full flex-col items-center justify-center'>
      <span>
        <Loader size='large' />
      </span>
      <span className='text-center text-xl font-medium'>Завантаження...</span>
    </div>
  );
}
