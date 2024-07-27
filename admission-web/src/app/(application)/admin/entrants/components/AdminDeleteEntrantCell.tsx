import {useRouter} from "next/navigation";
import {useCommonToast} from "@/components/ui/toast/use-common-toast";
import AdminEntrantsApi from "@/lib/api/admin-entrants-api";
import AdminAlertDialog from "@/app/admin/_components/AdminAlertDialog";
import {Button} from "@/components/ui/button";
import {Trash2Icon} from "lucide-react";

export const AdminDeleteEntrantCell = ({ row }: any) => {
    const { refresh } = useRouter();
    const { toastSuccess, toastError } = useCommonToast();

    const handleDelete = async () => {
        try {
            await AdminEntrantsApi.deleteEntrant(row.original.id);
            refresh();
            toastSuccess();
        } catch (error) {
            toastError(error);
        }
    };

    return (
        <AdminAlertDialog
            button={
                <Button
                    variant='outline'
                    className='h-[50px] w-[50px] rounded-full'
                >
                    <Trash2Icon />
                </Button>
            }
            title='Видалення вступника з черги'
            description='Ви впевнені, що хочете видалити вступика? Вспупник буде видалений разом із всіма його документами, цю дію неможливо буде відмінити!'
            action={handleDelete}
        />
    );
};
