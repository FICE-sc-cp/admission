import { User } from '@/app/api/admin-entrants/admin-entrants-api.types';

export type QueuePosition = {
  id: number;
  userId: string;
  code: number;
  position: number;
  status: 'PROCESSING' | 'WAITING';
  lastNotifiedPosition: number;
  createdAt: string;
  updatedAt: string;
  relativePosition: number;
  user: User;
};

export type Positions = {
  positions: QueuePosition[];
};

export type UpdateUser = {
  status?: string;
  delta?: number;
};

export type OpenQueue = {
  opened: boolean;
};
