import { Loader2 } from 'lucide-react';

const sizeMapper = {
  small: 75,
  medium: 100,
  large: 160,
};

export function Loader({
  size = 'medium',
}: {
  size?: 'small' | 'medium' | 'large';
}) {
  return (
    <Loader2
      className='mb-7 animate-spin text-violet-700'
      size={sizeMapper[size]}
    />
  );
}
