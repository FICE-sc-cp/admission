import { Required } from '../../../globals/decorators';
import { EducationProgram } from '@prisma/client';

export class CreatePriorityDto {
  @Required()
    number: number;

  @Required({
    type: 'enum',
    enum: EducationProgram,
  })
    program: EducationProgram;
}
