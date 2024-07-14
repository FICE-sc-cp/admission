import ContractForm from '@/components/ui/forms/contract-form';

export default function page() {
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      Контракт
      <ContractForm />
    </main>
  );
}
