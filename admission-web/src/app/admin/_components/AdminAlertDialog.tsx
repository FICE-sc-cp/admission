import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {ReactElement} from "react";

interface AdminTableHeaderButtonProps {
    button: ReactElement,
    title?: string,
    description?: string,
    action: () => void,
}

export default function AdminAlertDialog({button, title, description, action }: AdminTableHeaderButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col items-center rounded-xl">
                <AlertDialogHeader className="flex items-center">
                    <AlertDialogTitle className="text-xl font-medium">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="max-w-[400px] text-black font-light text-center">{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row items-center space-x-2">
                    <AlertDialogCancel>Скасувати</AlertDialogCancel>
                    <AlertDialogAction onClick={action}>Підтвердити</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
