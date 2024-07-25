"use client";

import {ColumnDef} from "@tanstack/react-table"
import AdminAlertDialogs from "@/app/admin/queue/components/AdminAlertDialogs";

export type AdminEntrants = {
    name: string,
    degree: string,
    specialty: string,
    status: string,
}

export const columns: ColumnDef<AdminEntrants>[] = [
    {
        accessorKey: "name",
        header: "ПІБ",
    },
    {
        accessorKey: "degree",
        header: "Освітній ступінь"
    },
    {
        accessorKey: "specialty",
        header: "Спеціальність",
    },
    {
        accessorKey: "status",
        header: "Статус",
    },
    {
        accessorKey: "button",
        header: "",
        cell: () => {
            return (
                <AdminAlertDialogs
                    type="delete"
                    title="Видалення вступника з черги"
                    description="Ви впевнені, що хочете видалити вступика? Вспупник буде видалений разом із всіма його документами, цю дію неможливо буде відмінити!"/>
            );
        },
    },
];
