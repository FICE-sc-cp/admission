import { Badge } from '@/components/ui/badge';

interface AdminStatusBadgeProps {
  status: 'WAITING' | 'PROCESSING';
}

const adminBadgeStyles = {
  WAITING: {
    className: 'bg-gray-200 whitespace-nowrap text-black hover:bg-gray-200',
    label: 'Чекає',
  },
  PROCESSING: {
    className: 'bg-lime-300 whitespace-nowrap text-black hover:bg-lime-300',
    label: 'Подає документи',
  },
};

export function AdminStatusBadge({
  status = 'WAITING',
}: AdminStatusBadgeProps) {
  const { className, label } = adminBadgeStyles[status];
  return <Badge className={className}>{label}</Badge>;
}
