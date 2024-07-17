'use client';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface NavMenuItemProps {
  title: string;
  icon: ReactNode;
  href: string;
  onClick?: () => void;
  withNavElem?: boolean;
}

export default function NavMenuItem({
  withNavElem = false,
  ...item
}: NavMenuItemProps) {
  const pathname = usePathname();

  const className = `flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent hover:text-accent-foreground ${pathname === item.href || item.href.includes(pathname.split('/')[1]) ? 'bg-primary text-white hover:!bg-primary hover:!text-white/85' : ''} `;

  return (
    <Link
      onClick={item?.onClick}
      key={item.title}
      href={item.href}
      className={!withNavElem ? className : ''}
    >
      {withNavElem ? (
        <DropdownMenuItem
          key={item.title}
          onClick={item.onClick}
          className={className}
        >
          {item.icon}
          <span>{item.title}</span>
        </DropdownMenuItem>
      ) : (
        <>
          {item.icon}
          <span>{item.title}</span>
        </>
      )}
    </Link>
  );
}
