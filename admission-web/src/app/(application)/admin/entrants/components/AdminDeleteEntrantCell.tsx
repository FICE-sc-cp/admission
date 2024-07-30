import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import AdminAlertDialog from '@/app/(application)/admin/_components/AdminAlertDialog';
import AdminEntrantsApi from '@/app/api/admin-entrants/admin-entrants-api';
import { useRouter } from 'next/navigation';

export const AdminDeleteEntrantCell = ({ row }: any) => {
  const { refresh } = useRouter();
  const { toastSuccess, toastError } = useCommonToast();

  return (
    <AdminAlertDialog
      button={
        <Button variant='outline' className='h-[50px] w-[50px] rounded-full'>
          <Trash2Icon />
        </Button>
      }
      title='Видалення вступника з черги'
      description='Ви впевнені, що хочете видалити вступика? Вспупник буде видалений разом із всіма його документами, цю дію неможливо буде відмінити!'
      action={async () => {
        try {
          await AdminEntrantsApi.deleteEntrant(row.original.id);
          toastSuccess();
        } catch (error) {
          toastError(error);
        }
        refresh();
      }}
    />
  );
};
