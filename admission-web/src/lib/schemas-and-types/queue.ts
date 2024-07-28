export type QueuePositionStatus = 'WAITING' | 'PROCESSING';

export interface QueueUser {
  id: string;
  position: number;
}
