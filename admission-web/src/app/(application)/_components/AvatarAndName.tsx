import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { cn } from '@/lib/cn';

interface AvatarAndNameProps {
  name: string;
  href?: string;
  avatarUrl?: string;
  size?: 'small' | 'default';
}

const sizes = {
  small: 'h-9 w-9',
  default: 'h-12 w-12',
};

export default function AvatarAndName({
  name,
  avatarUrl = 'from-image.png',
  href = '#',
  size = 'default',
}: AvatarAndNameProps) {
  return (
    <Link href={href} className='flex items-center gap-3'>
      <Avatar className={cn(sizes[size], 'border-2 border-gray-200')}>
        <AvatarImage src={avatarUrl} className='rounded-full object-cover' />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <span className='font-medium'>{name}</span>
    </Link>
  );
}
