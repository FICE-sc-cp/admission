import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {Table} from "@tanstack/react-table";
import {ChevronDownIcon, ChevronUpIcon} from "lucide-react";

interface AdminColumnSelectProps<TData> {
    table: Table<TData>;
}

export default function AdminColumnSelect<TData>({table}: AdminColumnSelectProps<TData>) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <div className="focus:outline-none focus:ring-0 hover:outline-none">
                    <Button
                        variant="outline"
                        className="w-[160px] justify-between focus:outline-none focus:ring-0 hover:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Колонки
                        {isOpen ? <ChevronUpIcon className="ml-3 w-[16px] h-[16px]"/> :
                            <ChevronDownIcon className="ml-3 w-[16px] h-[16px]"/>}
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {table
                    .getAllColumns()
                    .filter(
                        (column) => column.getCanHide()
                    )
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="w-[150px] cursor-pointer"
                                checked={!(column.getIsVisible())}
                                onCheckedChange={(value) =>
                                    column.toggleVisibility(!value)
                                }
                            >
                                {(column.columnDef as any).meta}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
