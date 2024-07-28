export interface Location {
  latitude: number;
  longitude: number;
}
export enum QueueErorr {
  NO_PERMISSION = 'NO_PERMISSION',
  NOT_NEARBY = 'NOT_NEARBY',
  CLOSED = 'CLOSED',
  ALREADY_IN_QUEUE = 'ALREADY_IN_QUEUE',
}
