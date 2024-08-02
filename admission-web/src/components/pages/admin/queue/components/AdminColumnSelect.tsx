import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Table } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface AdminColumnSelectProps<TData> {
  table: Table<TData>;
}

export function AdminColumnSelect<TData>({
  table,
}: AdminColumnSelectProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className='hover:outline-none focus:outline-none focus:ring-0'>
          <Button
            variant='outline'
            className='w-[160px] justify-between hover:outline-none focus:outline-none focus:ring-0'
            onClick={() => setIsOpen(!isOpen)}
          >
            Колонки
            {isOpen ? (
              <ChevronUpIcon className='ml-3 h-[16px] w-[16px]' />
            ) : (
              <ChevronDownIcon className='ml-3 h-[16px] w-[16px]' />
            )}
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='w-[150px] cursor-pointer'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(value)}
              >
                {(column.columnDef as any).meta}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
