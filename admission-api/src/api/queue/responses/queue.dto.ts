import { Optional, Required } from '../../../globals/decorators';

export class QueueDto {
  @Optional()
    queueSize?: number;

  @Required()
    lastPosition: number;

  @Required()
    opened: boolean;
}
