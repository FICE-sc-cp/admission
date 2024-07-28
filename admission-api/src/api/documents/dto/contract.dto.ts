import { Optional, Required } from '../../../globals/decorators';
import {
  DocumentState,
  EducationalDegree,
  EducationalProgramType,
  FundingSource,
  PaymentType,
  StudyForm,
} from '@prisma/client';
import { PriorityDto } from './priority.dto';

export class ContractDto {
  @Required()
    id: string;
  
  @Required({
    type: 'enum',
    enum: DocumentState,
  })
    state: DocumentState;
  
  @Optional()
    number?: string;
  
  @Optional()
    date?: string;
  
  @Required({
    type: 'enum',
    enum: EducationalDegree,
  })
    degree: EducationalDegree;
  
  @Optional()
    educationalProgram?: string;
  
  @Optional({
    type: 'enum',
    enum: EducationalProgramType,
  })
    programType: EducationalProgramType;
  
  @Optional({
    type: 'enum',
    enum: PaymentType,
  })
    paymentType?: PaymentType;
  
  @Required()
    specialty: string;
  
  @Required({
    type: 'enum',
    enum: StudyForm,
  })
    studyForm: StudyForm;
  
  @Required({
    type: 'enum',
    enum: FundingSource,
  })
    fundingSource: FundingSource;

  @Optional({
    type: 'enum',
    enum: DocumentState,
  })
    priorityState?: DocumentState;

  @Optional()
    priorityDate?: string;
  
  @Required()
    userId: string;
  
  @Required()
    createdAt: Date;
  
  @Required()
    updatedAt: Date;

  @Optional({
    type: PriorityDto,
    isArray: true,
  })
    priorities?: PriorityDto[];
}
