import { Required } from '../../../globals/decorators';
import { DocumentState } from '@prisma/client';
import { PriorityDto } from './priority.dto';

export class UserPriorityDto {
  @Required()
    id: string;

  @Required()
    userId: string;

  @Required({
    type: 'enum',
    enum: DocumentState,
  })
    state: DocumentState;

  @Required()
    date: string;

  @Required()
    specialty: string;

  @Required()
    createdAt: Date;

  @Required()
    updatedAt: Date;

  @Required({
    type: PriorityDto,
    isArray: true,
  })
    priorities: PriorityDto[];
}
