'use client';
import { entrantNavigationItems } from '@/constants/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DesktopSidebarNavigation({
  role = 'entrant',
}: {
  role?: 'admin' | 'entrant';
}) {
  const pathname = usePathname();

  return (
    <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
      {role === 'entrant' &&
        entrantNavigationItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === item.href ? 'bg-muted text-foreground' : ''} `}
          >
            <item.icon className='h-5 w-5' />
            <span>{item.title}</span>
          </Link>
        ))}
    </nav>
  );
}
