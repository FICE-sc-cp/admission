import { QueuePositionStatus } from '@/lib/schemas-and-types/queue';

export type UpdateUser = {
  status?: QueuePositionStatus;
  delta?: number;
};
