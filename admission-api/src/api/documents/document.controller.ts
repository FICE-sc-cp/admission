import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { DocumentService } from './document.service';
import { ContractDto } from './dto/contract.dto';
import { ContractByIdPipe } from './pipes/contract-by-id.pipe';
import { UpdateContractDto } from './dto/update-contract.dto';
import { CreateContractDto } from './dto/create-contract.dto';

@ApiTags('Documents')
@Controller({
  path: '/documents',
})
export class DocumentController {
  constructor (
    private readonly documentService: DocumentService,
  ) {}
  
  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create user contract with priorities' })
  @ApiResponse({ type: ContractDto })
  async createDocuments (
    @Body() body: CreateContractDto,
  ): Promise<ContractDto> {
    return this.documentService.createDocuments(body);
  }

  @Patch('/:contractId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update user contract with priorities' })
  @ApiResponse({ type: ContractDto })
  async updateDocuments (
    @Param('contractId', ContractByIdPipe) contractId: string,
    @Body() body: UpdateContractDto,
  ): Promise<ContractDto> {
    return this.documentService.updateDocuments(contractId, body);
  }

  @Delete('/:contractId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete user contract with priorities' })
  @ApiResponse({ type: ContractDto })
  async deleteDocuments (
    @Param('contractId', ContractByIdPipe) contractId: string,
  ): Promise<ContractDto> {
    return this.documentService.deleteDocuments(contractId);
  }
}