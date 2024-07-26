import { Required } from '../../../globals/decorators';

export class JoinQueueDto {
  @Required()
    phoneNumber: string;

  @Required()
    isDorm: boolean;

  @Required()
    printedEdbo: boolean;

  @Required()
    expectedSpecialities: string;

  @Required()
    confirmedStudyPlace: boolean;
}
