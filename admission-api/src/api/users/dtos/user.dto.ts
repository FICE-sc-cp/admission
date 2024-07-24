import { Optional, Required } from '../../../globals/decorators';
import { Role } from '@prisma/client';
import { ContractDto } from '../../documents/dto/contract.dto';
import { EntrantDataDto } from './entrant-data.dto';
import { RepresentativeDataDto } from './representative-data.dto';
import { CustomerDataDto } from './customer-data.dto';
import { UserPriorityDto } from '../../documents/dto/user-priority.dto';

export class UserDto {
  @Required()
    id: string;

  @Required()
    email: string;

  @Required()
    firstName: string;

  @Optional()
    middleName?: string;

  @Required()
    lastName: string;

  @Required({
    type: 'enum',
    enum: Role,
  })
    role: Role;

  @Required()
    benefit: boolean;

  @Optional()
    competitivePoint: number;

  @Required()
    telegramId: bigint;

  @Required()
    expectedSpecialities: string;

  @Required()
    isDorm: boolean;

  @Required()
    printedEdbo: boolean;

  @Required()
    phone: string;

  @Required()
    username: string;

  @Required()
    createdAt: Date;

  @Required()
    updatedAt: Date;

  @Required({
    type: ContractDto,
    isArray: true,
  })
    contracts: ContractDto[];

  @Required({
    type: UserPriorityDto,
    isArray: true,
  })
    userPriorities: UserPriorityDto[];
  
  @Optional({
    type: EntrantDataDto,
  })
    entrantData?: EntrantDataDto;
  
  @Optional({
    type: RepresentativeDataDto,
  })
    representativeData?: RepresentativeDataDto;
  
  @Optional({
    type: CustomerDataDto,
  })
    customerData?: CustomerDataDto;
}
