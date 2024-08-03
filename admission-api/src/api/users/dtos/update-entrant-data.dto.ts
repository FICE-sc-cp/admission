import { Optional, Required } from '../../../globals/decorators';

export class UpdateEntrantDataDto {
  @Optional()
    passportSeries?: string;

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

  @Optional()
    region?: string;

  @Required()
    settlement: string;

  @Required()
    address: string;

  @Required()
    index: string;
}
