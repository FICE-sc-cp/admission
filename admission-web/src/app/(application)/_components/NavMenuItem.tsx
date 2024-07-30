'use client';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface NavMenuItemProps {
  title: string;
  icon: ReactNode;
  href: string;
  withNavElem?: boolean;
  onClick: () => void;
}

export default function NavMenuItem({
  withNavElem = false,
  onClick,
  ...item
}: NavMenuItemProps) {
  const pathname = usePathname();

  const notIndexPageAndPathnameMatches =
    item.href !== '/' && pathname.includes(item.href);

  const isIndexPageAndPathnameMatches = item.href === '/' && pathname === '/';

  const displayCurrentItem =
    notIndexPageAndPathnameMatches || isIndexPageAndPathnameMatches;
  const className = `flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent hover:text-accent-foreground ${displayCurrentItem ? 'bg-primary text-white hover:!bg-primary hover:!text-white/85' : ''} `;

  return (
    <Link
      key={item.title}
      href={item.href}
      className={!withNavElem ? className : ''}
      onClick={onClick}
    >
      {withNavElem ? (
        <DropdownMenuItem key={item.title} className={className}>
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
