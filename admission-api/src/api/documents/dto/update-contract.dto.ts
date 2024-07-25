import { DocumentState, EducationalDegree, EducationalProgramType, FundingSource, PaymentType, StudyForm } from '@prisma/client';
import { Optional } from 'src/globals/decorators';
import { CreatePriorityDto } from './create-priority.dto';

export class UpdateContractDto {
  @Optional({
    type: 'enum',
    enum: DocumentState,
  })
    state?: DocumentState;
  
  @Optional()
    number?: string;
  
  @Optional()
    date?: string;
  
  @Optional({
    type: 'enum',
    enum: EducationalDegree,
  })
    degree?: EducationalDegree;
  
  @Optional()
    educationalProgram?: string;
  
  @Optional({
    type: 'enum',
    enum: EducationalProgramType,
  })
    programType?: EducationalProgramType;
  
  @Optional({
    type: 'enum',
    enum: PaymentType,
  })
    paymentType?: PaymentType;
  
  @Optional()
    specialty?: string;
  
  @Optional({
    type: 'enum',
    enum: StudyForm,
  })
    studyForm?: StudyForm;
  
  @Optional({
    type: 'enum',
    enum: FundingSource,
  })
    fundingSource?: FundingSource;

  @Optional({
    type: 'enum',
    enum: DocumentState,
  })
    priorityState?: DocumentState;

  @Optional()
    priorityDate?: string;

  @Optional({
    type: CreatePriorityDto,
    isArray: true,
  })
    priorities?: CreatePriorityDto[];
}