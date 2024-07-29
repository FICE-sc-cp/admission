import { Optional, Required } from '../../../globals/decorators';

export class EntrantDataDto {
  @Required()
    userId: string;

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

  @Required()
    region: string;

  @Required()
    settlement: string;

  @Required()
    address: string;

  @Required()
    index: string;

  @Required()
    createdAt: Date;

  @Required()
    updatedAt: Date;
}
