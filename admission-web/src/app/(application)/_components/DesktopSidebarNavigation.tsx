'use client';
import { entrantNavigationItems } from '@/lib/constants/navigation';
import NavMenuItem from './NavMenuItem';
import useAuth from '@/hooks/useAuth';
import { adminNavigationItems } from '@/lib/constants/admin-navigation';

export const DesktopSidebarNavigation = () => {
  const { user } = useAuth();
  return (
    <nav className='grid items-start gap-2 text-sm font-medium lg:px-4'>
      {user && user?.role === 'ENTRANT'
        ? entrantNavigationItems.map((item) => (
            <NavMenuItem
              key={item.href}
              href={item.href}
              icon={<item.icon className={'h-5 w-5'} />}
              title={item.title}
              onClick={item?.onClick}
            />
          ))
        : adminNavigationItems.map((item) => (
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
};
