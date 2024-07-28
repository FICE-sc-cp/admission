import {
  UserRoundCheck,
  FileText,
  Flame,
  BetweenHorizonalStart,
} from 'lucide-react';

export const entrantNavigationItems = [
  {
    title: 'Профіль',
    href: '/',
    icon: UserRoundCheck,
  },
  {
    title: 'Договір',
    href: '/contract',
    icon: FileText,
  },
  {
    title: 'Пріоритети',
    href: '/priority',
    icon: Flame,
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
