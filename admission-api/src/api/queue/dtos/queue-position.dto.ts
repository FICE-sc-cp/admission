import { Optional, Required } from '../../../globals/decorators';
import { QueuePositionStatus } from '@prisma/client';

export class QueuePositionDto {
  @Required()
    id: number;

  @Required()
    userId: string;

  @Required()
    code: number;

  @Required()
    position: number;

  @Required({
    type: 'enum',
    enum: QueuePositionStatus,
  })
    status: QueuePositionStatus;

  @Required()
    lastNotifiedPosition: number;

  @Required()
    createdAt: Date;

  @Required()
    updatedAt: Date;

  @Optional()
    relativePosition?: number;
}
