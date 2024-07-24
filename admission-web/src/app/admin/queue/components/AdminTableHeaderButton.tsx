import { Button } from "@/components/ui/button";
import { AdminQueue } from "@/app/admin/queue/columns";
import { Column } from "@tanstack/react-table";

interface AdminTableHeaderButtonProps {
    text?: string,
    width?: string,
    column: Column<AdminQueue>,
}

export default function AdminTableHeaderButton({ text, column }: AdminTableHeaderButtonProps) {
    return (
        <Button
            className={`w-fit p-0 m-1`}
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {text}
        </Button>
    );
}
