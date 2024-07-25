import { Optional } from '../../../globals/decorators';
import { QueuePositionStatus } from '@prisma/client';

export class UpdateQueuePositionDto {
  @Optional({
    type: 'enum',
    enum: QueuePositionStatus,
  })
    status: QueuePositionStatus;

  @Optional()
    delta: number;
}
