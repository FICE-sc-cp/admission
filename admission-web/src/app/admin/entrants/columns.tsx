"use client";

import {ColumnDef} from "@tanstack/react-table";
import AdminAlertDialog from "@/app/admin/_components/AdminAlertDialog";
import {User} from "@/constants/admin-entrants-table";
import {Button} from "@/components/ui/button";
import {Trash2Icon} from "lucide-react";
import {deleteEntrant} from "@/app/admin/entrants/page";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "lastName",
        header: "ПІБ",
    },
    {
        accessorKey: "firstName",
        header: "",
    },
    {
        accessorKey: "middleName",
        header: "",
    },
    {
        accessorKey: "contracts",
        header: "Освітній ступінь",
        cell: ({row}) => {
            const contracts = row.original.contracts;
            return contracts.map(contract => contract.degree);
        }
    },
    {
        accessorKey: "expectedSpecialities",
        header: "Спеціальність",
    },
    {
        accessorKey: "contracts",
        header: "Статус",
        cell: ({row}) => {
            const contracts = row.original.contracts;
            return contracts.some(contract => contract.state === 'APPROVED') ? 'ПОДАНО' : 'НЕ ПОДАНО';
        }
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({row}) => {
            return (
                <AdminAlertDialog
                    button={<Button variant="outline" className="w-[50px] h-[50px] rounded-full"><Trash2Icon/></Button>}
                    title="Видалення вступника з черги"
                    description="Ви впевнені, що хочете видалити вступика? Вспупник буде видалений разом із всіма його документами, цю дію неможливо буде відмінити!"
                    action={() => {
                        const id = row.original.id;
                        deleteEntrant(id);
                    }}/>
            );
        },
    },
];
