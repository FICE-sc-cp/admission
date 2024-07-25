'use client';
import { entrantNavigationItems } from '@/constants/navigation';
import NavMenuItem from './NavMenuItem';

export default function DesktopSidebarNavigation({
  role = 'entrant',
}: {
  role?: 'admin' | 'entrant';
}) {
  return (
    <nav className='grid items-start gap-2 text-sm font-medium lg:px-4'>
      {role === 'entrant' &&
        entrantNavigationItems.map((item) => (
          <NavMenuItem
            key={item.href}
            href={item.href}
            icon={<item.icon className={'h-5 w-5'} />}
            title={item.title}
            onClick={item?.onClick}
          />
        ))}
    </nav>
  );
}
