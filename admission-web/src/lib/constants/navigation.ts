import {
  UserRoundCheck,
  FileText,
  Flame,
  BetweenHorizonalStart,
  LogOut,
  Fingerprint,
} from 'lucide-react';

export const entrantNavigationItems = [
  {
    title: 'Профіль',
    href: '/',
    icon: UserRoundCheck,
  },
  {
    title: 'Особисті дані',
    href: '/personal-data',
    icon: Fingerprint,
  },
  {
    title: 'Договір',
    href: '/documents',
    icon: FileText,
  },
  {
    title: 'Черга',
    href: '/queue',
    icon: BetweenHorizonalStart,
  },
  {
    title: 'Вихід',
    href: '/auth/sign-in',
    icon: LogOut,
    onClick: () => {
      authApi.logout();
    },
  },
];
