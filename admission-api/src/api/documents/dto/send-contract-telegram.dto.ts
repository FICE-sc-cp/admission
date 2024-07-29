import { Optional, Required } from '../../../globals/decorators';

export class SendContractTelegramDto {
  @Required()
    firstName: string;

  @Required()
    lastName: string;

  @Optional()
    middleName?: string;

  @Required()
    specialty: string;
  
  @Required()
    contractNumber: string;
  
  @Optional()
    competitivePoint: number;

  @Required()
    date: string;
}
