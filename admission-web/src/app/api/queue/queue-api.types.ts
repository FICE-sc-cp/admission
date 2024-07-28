import { QueuePositionStatus } from '@/lib/schemas-and-types/queue';

export interface GetQueueRes {
  queueSize: number;
  lastPosition: number;
}

export interface GetQueueUsersRes {
  positions: string[];
}

export interface UpdateQueueBody {
  opened: boolean;
}

export interface AddUserToQueueBody {
  phoneNumber: string;
  isDorm: boolean;
  printedEdbo: boolean;
  expectedSpecialities: string;
  confirmedStudyPlace: boolean;
}

export interface UpdateQueueUserBody {
  status: QueuePositionStatus;
}
