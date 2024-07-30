import { Button } from '@/components/ui/button';
import { Column } from '@tanstack/react-table';
import { PositionInQueue } from '@/lib/schemas-and-types/queue';

interface AdminTableHeaderButtonProps {
  text?: string;
  width?: string;
  column: Column<PositionInQueue>;
}

export function AdminTableHeaderButton({
  text,
  column,
}: AdminTableHeaderButtonProps) {
  return (
    <Button
      className='m-0 w-fit p-0'
      variant='ghost'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {text}
    </Button>
  );
}
