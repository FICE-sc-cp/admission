import { Optional, Required } from '../../../globals/decorators';

export class PersonalDataDto {
  @Required()
    firstName: string;

  @Optional()
    middleName?: string;

  @Required()
    lastName: string;

  @Optional()
    passportSeries?: string;

  @Required()
    passportNumber: string;

  @Required()
    passportInstitute: string;

  @Required()
    passportDate: string;

  @Optional()
    region?: string;

  @Required()
    settlement: string;

  @Required()
    address: string;

  @Required()
    index: string;

  @Optional()
    idCode?: string;

  @Required()
    phoneNumber: string;

  @Required()
    email: string;
}