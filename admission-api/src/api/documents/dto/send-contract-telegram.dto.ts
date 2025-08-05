import { Specialty } from '@prisma/client';
import { Optional, Required } from '../../../globals/decorators';

export class SendContractTelegramDto {
  @Required()
    firstName: string;

  @Required()
    lastName: string;

  @Optional()
    middleName?: string;

  @Required({
    type: 'enum',
    enum: Specialty,
  })
    specialty: Specialty;
  
  @Required()
    contractNumber: string;
  
  @Optional()
    competitivePoint: number;

  @Required()
    date: string;
}
