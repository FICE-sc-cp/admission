'use client';
import AvatarAndName from './AvatarAndName';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { entrantNavigationItems } from '@/constants/navigation';

import NavMenuItem from '@/app/(application)/_components/NavMenuItem';
import useUser from '@/hooks/useUser';

export default function MobileNavigationHeaderAndMenu() {
  const [showX, setShowX] = useState(false);
  const { user } = useUser();

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        setShowX(open);
      }}
    >
      <DropdownMenuTrigger asChild>
        <header className='pointer-events-none sticky top-2 mx-2 flex h-12 items-center justify-between gap-4 rounded border border-b border-gray-200 bg-white px-4 shadow-md md:hidden'>
          <AvatarAndName
            name={`${user?.firstName} ${user?.lastName}`}
            size='small'
          />
          <Button className='pointer-events-auto' variant='ghost' size='icon'>
            {showX ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </header>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='w-[var(--radix-popper-anchor-width)]'
        onAuxClick={() => console.log('aux')}
      >
        <DropdownMenuGroup className='flex flex-col gap-y-1.5 p-2'>
          {entrantNavigationItems.map((item) => (
            <NavMenuItem
              key={item.title}
              href={item.href}
              icon={<item.icon className={'h-5 w-5'} />}
              title={item.title}
              onClick={item?.onClick}
              withNavElem
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
