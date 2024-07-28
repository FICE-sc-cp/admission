import { Required } from '../../../globals/decorators';

export class JoinQueueDto {
  @Required()
    phone: string;

  @Required()
    isDorm: boolean;

  @Required()
    printedEdbo: boolean;

  @Required()
    expectedSpecialities: string;

  @Required()
    confirmedStudyPlace: boolean;
}
