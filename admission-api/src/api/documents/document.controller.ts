import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { DocumentService } from './document.service';
import { ContractDto } from './dto/contract.dto';
import { ContractByIdPipe } from './pipes/contract-by-id.pipe';
import { UpdateContractDto } from './dto/update-contract.dto';
import { CreateContractDto } from './dto/create-contract.dto';
import { Response } from 'express';

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

  @Get('/:contractId/download/contract')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Download user contract' })
  @ApiResponse({ type: Buffer })
  async downloadContract (
    @Param('contractId', ContractByIdPipe) contractId: string,
    @Res() response: Response,
  ): Promise<void> {
    const file = await this.documentService.downloadContract(contractId);
    response.header('Content-Type', file.contentType);
    response.header('Content-Disposition', `attachment; filename=${file.fileName}`);
    response.send(file.data);
  }

  @Get('/:contractId/download/payment')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Download user payment' })
  @ApiResponse({ type: Buffer })
  async downloadPayment (
    @Param('contractId', ContractByIdPipe) contractId: string,
    @Res() response: Response,
  ): Promise<void> {
    const file = await this.documentService.downloadPayment(contractId);
    response.header('Content-Type', file.contentType);
    response.header('Content-Disposition', `attachment; filename=${file.fileName}`);
    response.send(file.data);
  }

  @Get('/:contractId/download/priority')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Download user priority' })
  @ApiResponse({ type: Buffer })
  async downloadPriority (
    @Param('contractId', ContractByIdPipe) contractId: string,
    @Res() response: Response,
  ): Promise<void> {
    const file = await this.documentService.downloadPriority(contractId);
    response.header('Content-Type', file.contentType);
    response.header('Content-Disposition', `attachment; filename=${file.fileName}`);
    response.send(file.data);
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