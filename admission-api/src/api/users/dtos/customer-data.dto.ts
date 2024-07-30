import { Optional, Required } from '../../../globals/decorators';

export class CustomerDataDto {
  @Required()
    userId: string;

  @Required()
    firstName: string;

  @Optional()
    middleName?: string;

  @Required()
    lastName: string;

  @Required()
    email: string;

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
