import { Optional } from '../../../globals/decorators';
import { Role } from '@prisma/client';
import { EntrantDataDto } from './entrant-data.dto';
import { RepresentativeDataDto } from './representative-data.dto';
import { CustomerDataDto } from './customer-data.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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
    phone?: string;

  @Optional({
    type: EntrantDataDto,
  })
  @Type(() => EntrantDataDto)
  @ValidateNested()
    entrantData?: EntrantDataDto;

  @Optional({
    type: RepresentativeDataDto,
  })
  @Type(() => RepresentativeDataDto)
  @ValidateNested()
    representativeData?: RepresentativeDataDto;

  @Optional({
    type: CustomerDataDto,
  })
  @Type(() => CustomerDataDto)
  @ValidateNested()
    customerData?: CustomerDataDto;
}
