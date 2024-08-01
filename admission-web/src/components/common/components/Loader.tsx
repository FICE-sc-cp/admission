import { Loader2 } from 'lucide-react';

export function Loader() {
  return (
    <div className='flex min-h-96 min-w-96 items-center justify-center'>
      <span>
        <Loader2 className='text-clay-700 animate-spin' size={80} />
      </span>
    </div>
  );
}
