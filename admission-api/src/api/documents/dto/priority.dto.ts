import { Required } from '../../../globals/decorators';
import { EducationProgram } from '@prisma/client';

export class PriorityDto {
  @Required()
    contractId: string;

  @Required()
    number: number;

  @Required({
    type: 'enum',
    enum: EducationProgram,
  })
    program: EducationProgram;

  @Required()
    createdAt: Date;

  @Required()
    updatedAt: Date;
}
