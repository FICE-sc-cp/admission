export type QueuePositionStatus = 'WAITING' | 'PROCESSING';

export interface QueueUser {
  id: string;
  position: number;
  relativePosition: number;
  code: string;
}

export interface PositionInQueue {
  id: number;
  userId: string;
  code: number;
  position: number;
  status: QueuePositionStatus;
  lastNotifiedPosition: number;
  createdAt: string;
  updatedAt: string;
  relativePosition: number;
  user: UserInQueue;
}
interface UserInQueue {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  benefit: boolean;
  competitivePoint: number;
  telegramId: number;
  expectedSpecialities: string;
  isDorm: boolean;
  printedEdbo: boolean;
  confirmedStudyPlace: boolean;
  phone: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}
