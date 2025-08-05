import { Optional, Required } from '../../../globals/decorators';
import {
  DocumentState,
  EducationalDegree,
  EducationalProgramType,
  EducationProgram,
  FundingSource,
  PaymentType,
  Specialty,
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
  
  @Optional({
    type: 'enum',
    enum: EducationProgram,
  })
    educationalProgram?: EducationProgram;
  
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
  
  @Required({
    type: 'enum',
    enum: Specialty,
  })
    specialty: Specialty;
  
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

  @Optional({
    type: CreatePriorityDto,
    isArray: true,
  })
    priorities?: CreatePriorityDto[];
}
