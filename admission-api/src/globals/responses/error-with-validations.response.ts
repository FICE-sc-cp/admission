import { ErrorResponse } from './error.response';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorWithValidationsResponse extends ErrorResponse {
  @ApiPropertyOptional({
    description: 'Validation errors',
    type: [String],
  })
    validations?: string[];
}