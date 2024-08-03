import {
  BetweenHorizonalStart,
  UsersIcon,
  ListOrderedIcon,
} from 'lucide-react';

const BASE_URL = '/admin';

export const adminNavigationItems = [
  {
    title: 'Абітурієнти',
    href: BASE_URL + '/entrants',
    icon: UsersIcon,
  },
  {
    title: 'Черга',
    href: BASE_URL,
    icon: BetweenHorizonalStart,
  },
  {
    title: 'Поточний номер',
    href: BASE_URL + '/number',
    icon: ListOrderedIcon,
  },
];
