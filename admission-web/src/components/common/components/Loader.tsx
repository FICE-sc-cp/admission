import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';

const sizeMapper = {
  tiny: 25,
  small: 75,
  medium: 100,
  large: 160,
};

export function Loader({
  size = 'medium',
  className,
}: {
  size?: 'tiny' | 'small' | 'medium' | 'large';
  className?: string;
}) {
  return (
    <Loader2
      className={cn('mb-7 animate-spin text-violet-700', className)}
      size={sizeMapper[size]}
    />
  );
}
