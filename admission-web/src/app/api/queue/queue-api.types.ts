import { PositionInQueue, QueuePositionStatus } from '@/lib/types/queue.types';

export interface GetQueueRes {
  queueSize: number;
  lastPosition: number;
}

export interface GetQueueUsersRes {
  positions: PositionInQueue[];
}

export interface UpdateQueueBody {
  opened: boolean;
}

export interface AddUserToQueueBody {
  phone: string;
  isDorm: boolean;
  printedEdbo: boolean;
  expectedSpecialities: string;
  confirmedStudyPlace: boolean;
}

export interface UpdateQueueUserBody {
  status: QueuePositionStatus;
}
