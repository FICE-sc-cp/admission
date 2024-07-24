import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {Trash2Icon} from "lucide-react";

interface AdminTableHeaderButtonProps {
    type: 'movedown' | 'delete',
    btnText?: string,
    title?: string,
    description?: string,
}

export default function AdminAlertDialogs({type, btnText, title, description }: AdminTableHeaderButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {type === 'delete' ?
                    <Button variant="outline" className="w-[50px] h-[50px] rounded-full"><Trash2Icon /></Button> :
                    <Button>{btnText}</Button>}
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col items-center rounded-xl">
                <AlertDialogHeader className="flex items-center">
                    <AlertDialogTitle className="text-xl font-medium">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="max-w-[400px] text-black font-light text-center">{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row items-center space-x-2">
                    <AlertDialogCancel>Скасувати</AlertDialogCancel>
                    <AlertDialogAction>Підтвердити</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
