import { QueuePositionStatus } from '@/lib/types/queue.types';

export type UpdateUser = {
  status?: QueuePositionStatus;
  delta?: number;
};

export interface GetQueueRes {
  queueSize: number;
  lastPosition: number;
  opened: boolean;
}
