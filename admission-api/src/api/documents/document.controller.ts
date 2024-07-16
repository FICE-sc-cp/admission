import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { StudyContractDto } from './dto/study-contract.dto';
import { PriorityDto } from './dto/priority.dto';
import { EntrantByIdPipe } from '../users/pipes/entrant-by-id.pipe';
import { MessageResponse } from 'src/globals/responses/message.response';
import { ErrorResponse } from 'src/globals/responses/error.response';
import { ErrorWithValidationsResponse } from 'src/globals/responses/error-with-validations.response';

@ApiTags('Documents')
@Controller({
  path: '/documents',
})
export class DocumentController {
  constructor (
    private readonly documentService: DocumentService,
  ) {}

  @Post('/contract')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create entrant contract' })
  @ApiCreatedResponse({ type: MessageResponse })
  @ApiBadRequestResponse({
    type: ErrorWithValidationsResponse,
    description: ` 
      First name cannot be empty
      Last name cannot be empty
      Passport number cannot be empty
      Passport Institute cannot be empty
      Passport date cannot be empty
      Settlement cannot be empty
      Address cannot be empty
      Index cannot be empty
      Phone number cannot be empty
      Email cannot be empty empty
      Email is invalid
      Degree cannot be empty
      Specialty code cannot be empty
      Study type cannot be empty
      Study form cannot be empty
      isToAdmission cannot be empty
      
      Payment type is required`,
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponse,
    description: `
      Unauthorized`,
  })
  async createContract (
    @Body() body: StudyContractDto,
  ): Promise<MessageResponse> {
    return this.documentService.createContract(body);
  }

  @Post('/priority')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create entrant priority' })
  @ApiCreatedResponse({ type: MessageResponse })
  @ApiBadRequestResponse({
    type: ErrorWithValidationsResponse,
    description: `
      First name cannot be empty
      Last name cannot be empty
      Specialty code cannot be empty
      Email cannot be empty
      Email is invalid
      Day cannot be empty
      isToAdmission cannot be empty
      
      Education programs is invalid`,
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponse,
    description: `
      Unauthorized`,
  })
  async generatePriority (
    @Body() body: PriorityDto,
  ): Promise<MessageResponse> {
    return this.documentService.generatePriority(body);
  }

  @Get('/:entrantId/contracts')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all entrant contracts' })
  @ApiOkResponse({ type: MessageResponse })
  @ApiBadRequestResponse({
    type: ErrorResponse,
    description: `
      Entrant with such id does not exist
      User with such id does not existjpe

      Data were not found`,
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponse,
    description: `
      Unauthorized`,
  })
  async sendAllContracts (
    @Param('entrantId', EntrantByIdPipe) entrantId: string,
  ): Promise<MessageResponse> {
    return this.documentService.sendAllContracts(entrantId);
  }

  @Get('/:entrantId/priorities')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all entrant priorities' })
  @ApiOkResponse({ type: MessageResponse })
  @ApiBadRequestResponse({
    description: `   
      Entrant with such id does not exist
      
      Data were not found`,
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponse,
    description: `
      Unauthorized`,
  })
  async sendAllPriorities (
    @Param('entrantId', EntrantByIdPipe) entrantId: string,
  ): Promise<MessageResponse> {
    return this.documentService.sendAllPriorities(entrantId);
  }
}
