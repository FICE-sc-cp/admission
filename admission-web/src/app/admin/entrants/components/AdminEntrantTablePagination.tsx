import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons"
import {Table} from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";


interface AdminEntrantTablePaginationProps<TData> {
    table: Table<TData>
}

export function AdminEntrantTablePagination<TData>({
                                               table,
                                           }: AdminEntrantTablePaginationProps<TData>) {
    const currentPageIndex = table.getState().pagination.pageIndex + 1;
    return (
        <Pagination className="mt-3 flex justify-start sm:justify-between">
            <Button
                variant="ghost"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <ChevronLeftIcon className="mr-2 h-5 w-5"/>
                Попередня
            </Button>
            <PaginationContent>
                <PaginationItem>
                    <PaginationLink isActive>{currentPageIndex}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink>{currentPageIndex + 1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink>{currentPageIndex + 2}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis/>
                </PaginationItem>
            </PaginationContent>
            <Button
                variant="ghost"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Наступна
                <ChevronRightIcon className="ml-2 h-5 w-5"/>
            </Button>
        </Pagination>
    )
}
