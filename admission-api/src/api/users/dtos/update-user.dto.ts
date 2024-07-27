import { Optional } from '../../../globals/decorators';
import { Role } from '@prisma/client';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateCustomerDataDto } from './update-customer-data.dto';
import { UpdateRepresentativeDataDto } from './update-representative-data.dto';
import { UpdateEntrantDataDto } from './update-entrant-data.dto';

export class UpdateUserDto {
  @Optional()
    email?: string;

  @Optional()
    firstName?: string;

  @Optional()
    middleName?: string;

  @Optional()
    lastName?: string;

  @Optional({
    type: 'enum',
    enum: Role,
  })
    role?: Role;

  @Optional()
    expectedSpecialities?: string;

  @Optional()
    isDorm?: boolean;

  @Optional()
    printedEdbo?: boolean;

  @Optional()
    confirmedStudyPlace?: boolean;

  @Optional()
    phone?: string;

  @Optional({
    type: UpdateEntrantDataDto,
  })
  @Type(() => UpdateEntrantDataDto)
  @ValidateNested()
    entrantData?: UpdateEntrantDataDto;

  @Optional({
    type: UpdateRepresentativeDataDto,
  })
  @Type(() => UpdateRepresentativeDataDto)
  @ValidateNested()
    representativeData?: UpdateRepresentativeDataDto;

  @Optional({
    type: UpdateCustomerDataDto,
  })
  @Type(() => UpdateCustomerDataDto)
  @ValidateNested()
    customerData?: UpdateCustomerDataDto;
}
