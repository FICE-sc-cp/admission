import { Optional, Required } from '../../../globals/decorators';

export class UpdateEntrantDataDto {
  @Required()
    passportSeries: string;

  @Required()
    passportNumber: string;

  @Required()
    passportInstitute: string;

  @Required()
    passportDate: string;

  @Required()
    phoneNumber: string;

  @Optional()
    idCode?: string;

  @Required()
    email: string;

  @Required()
    region: string;

  @Required()
    settlement: string;

  @Required()
    address: string;

  @Required()
    index: string;
}
