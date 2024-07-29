import { Optional, Required } from '../../../globals/decorators';

export class RegistrationInQueueDto {
  @Required()
    id: string;

  @Required()
    email: string;

  @Required()
    firstName: string;

  @Optional()
    middleName?: string | null;

  @Required()
    lastName: string;

  @Optional()
    telegramId?: string | null;

  @Required()
    phone: string;

  @Required()
    is_dorm: boolean;

  @Required()
    printedEdbo: boolean;

  @Required()
    expectedSpecialities: string;
}
