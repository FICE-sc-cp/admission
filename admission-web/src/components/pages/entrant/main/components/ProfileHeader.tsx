import { cn } from '@/lib/utils/cn';

interface ProfileHeaderProps {
  label?: string;
  className?: string;
}
export function ProfileHeader({ label, className = '' }: ProfileHeaderProps) {
  return (
    <div
      className={cn('flex flex-row items-center justify-between', className)}
    >
      <h6 className='whitespace-nowrap text-sm font-light text-violet-500'>
        {label}
      </h6>
      <div className='ml-3 h-[1px] w-11/12 bg-violet-500'></div>
    </div>
  );
}
