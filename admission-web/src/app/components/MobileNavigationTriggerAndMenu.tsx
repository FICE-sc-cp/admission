'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { entrantNavigationItems } from '@/constants/navigation';

export default function MobileNavigationTriggerAndMenu({
  role = 'entrant',
}: {
  role?: 'admin' | 'entrant';
}) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col'>
        <Link
          href='#'
          className='flex items-center gap-2 text-lg font-semibold'
        >
          <Package2 className='h-6 w-6' />
          <span className='sr-only'>Acme Inc</span>
        </Link>
        <nav className='grid gap-2 text-lg font-medium'>
          {role === 'entrant' &&
            entrantNavigationItems.map((item) => {
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${pathname === item.href ? 'bg-muted text-foreground' : ''}`}
                >
                  <item.icon className='h-5 w-5' />
                  <span>{item.title}</span>
                </Link>
              );
            })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
