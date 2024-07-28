import { Separator } from '@/components/ui/separator';
import { DocumentsForm } from '@/app/(application)/documents/_components/DocumentsForm';

export default function page() {
  return (
    <main className='flex flex-1 flex-col gap-2 p-4 lg:gap-3 lg:p-6'>
      {/*If no personal data*/}
      {/*<NoPersonalData />*/}

      <p className='text-2xl font-semibold'>Створення договору про навчання</p>
      <Separator orientation='horizontal' className='w-full bg-violet-600' />
      <DocumentsForm />
    </main>
  );
}
