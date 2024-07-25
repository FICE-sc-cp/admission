import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import useAuth from '@/hooks/useAuth';

interface AvatarAndNameProps {
  size?: 'small' | 'default';
}

const sizes = {
  small: 'h-9 w-9',
  default: 'h-12 w-12',
};

export default function AvatarAndName({
  size = 'default',
}: AvatarAndNameProps) {
  const { user } = useAuth();

  return (
    <Link href='/' className='flex items-center gap-3'>
      <Avatar className={cn(sizes[size], 'border-2 border-gray-200')}>
        <AvatarImage
          src='from-image.png'
          className='rounded-full object-cover'
        />
        <AvatarFallback>{user?.firstName}</AvatarFallback>
      </Avatar>
      <span className='font-medium'>{user?.firstName}</span>
    </Link>
  );
}
