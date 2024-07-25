import { Optional, Required } from '../../../globals/decorators';
import {
  DocumentState,
  EducationalDegree,
  EducationalProgramType,
  FundingSource,
  PaymentType,
  StudyForm,
} from '@prisma/client';
import { CreatePriorityDto } from './create-priority.dto';

export class CreateContractDto { 
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
  
  @Required({
    type: 'enum',
    enum: PaymentType,
  })
    paymentType: PaymentType;
  
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

  @Required({
    type: CreatePriorityDto,
    isArray: true,
  })
    priorities: CreatePriorityDto[];
}
