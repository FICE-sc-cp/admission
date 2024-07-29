import { PageDto } from '../../../globals/dtos/page.dto';
import { Optional } from '../../../globals/decorators';
import { QueuePositionStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class GetUsersQuery extends PageDto {
  @Optional({
    type: 'enum',
    enum: QueuePositionStatus,
  })
  @IsEnum(QueuePositionStatus)
    status?: QueuePositionStatus;
}
