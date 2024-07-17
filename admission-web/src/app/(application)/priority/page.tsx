import NoContract from '@/app/(application)/priority/_components/NoContract';
import { Separator } from '@/components/ui/separator';
import SelectForm from '@/app/(application)/priority/_components/SelectForm';

export default function page() {
  return (
    <main className='flex flex-1 flex-col items-center gap-4 p-4 md:items-start lg:gap-6 lg:p-6'>
      <NoContract show={true} />
    </main>
  );
}
