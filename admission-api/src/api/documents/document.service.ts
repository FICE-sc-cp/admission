import { BadRequestException, Injectable } from '@nestjs/common';
import { DocumentRepo } from 'src/database/repo/document.repo';
import { ContractDto } from './dto/contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { CreateContractDto } from './dto/create-contract.dto';
import { UserRepo } from 'src/database/repo/user.repo';
import { FileService } from 'src/globals/files/file.service';
import {
  DocumentState,
  EducationalDegree,
  FundingSource,
  Specialty,
  StudyForm,
} from '@prisma/client';
import { PersonalDataDto } from './dto/personal-data.dto';
import { FileDto } from './dto/file.dto';
import { CONTRACT_ALREADY_EXISTS_MSG, CONTRACT_FUNDING_SOURCE_IS_BUDGET_MSG } from './constants';
import { TelegramAPI } from 'src/globals/telegram/telegram.api';

@Injectable()
export class DocumentService {
  constructor (
    private readonly documentRepo: DocumentRepo,
    private readonly userRepo: UserRepo,
    private readonly fileService: FileService,
  ) {}

  private DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  private getFullString (separator: string, ...args) {
    return args.filter((a) => a).join(separator);
  }

  private formatPersonalData (data: PersonalDataDto) {
    const passport = this.getFullString(' ', data.passportSeries, data.passportNumber);
    return {
      ...data,
      passport,
      passportData: this.getFullString(', ', data.passportDate, data.passportInstitute),
      address: this.getFullString(', ', data.region, data.settlement, data.address, data.index),
      idCode: !data.idCode ? passport : data.idCode,
      bigName: data.lastName.toUpperCase(),
    };
  }

  async createDocuments (data: CreateContractDto): Promise<ContractDto> {
    const { priorities, ...contract } = data;
    const existingContract = await this.documentRepo.find(contract);
    if (existingContract) {
      throw new BadRequestException(CONTRACT_ALREADY_EXISTS_MSG);
    }
    return this.documentRepo.create({
      ...contract,
      priorities: priorities ? {
        createMany: {
          data: priorities,
        },
      } : undefined,
    });
  }

  async downloadContract (id: string): Promise<FileDto> {
    const contract = await this.documentRepo.find({ id });
    const user = await this.userRepo.find({ id: contract.userId });

    const entrantData = this.formatPersonalData({
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      ...user.entrantData,
    });
    const representativeData = user.representativeData ? this.formatPersonalData(user.representativeData) : {};

    const contractTemplateName = contract.degree === EducationalDegree.BACHELOR ? `${contract.degree}_${contract.specialty}_${contract.programType}_${contract.studyForm}${contract.studyForm !== StudyForm.REMOTE ? `_${contract.fundingSource}` : ''}.docx` : `${contract.degree}_${contract.specialty}_${contract.educationalProgram}_${contract.programType}_${contract.studyForm}_${contract.fundingSource}.docx`;
    const contractFile = this.fileService.fillTemplate(contractTemplateName, {
      entrant: entrantData,
      representative: representativeData,
    });

    return {
      fileName: 'Contract.docx',
      contentType: this.DOCX,
      data: contractFile,
    };
  }

  async downloadPayment (id: string): Promise<FileDto> {
    const contract = await this.documentRepo.find({ id });
    const user = await this.userRepo.find({ id: contract.userId });

    if (contract.fundingSource !== FundingSource.CONTRACT) {
      throw new BadRequestException(CONTRACT_FUNDING_SOURCE_IS_BUDGET_MSG);
    }

    const entrantData = this.formatPersonalData({
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      ...user.entrantData,
    });
    const representativeData = user.representativeData ? this.formatPersonalData(user.representativeData) : {};

    const paymentFile = this.fileService.fillTemplate(`${contract.degree}_${contract.specialty === Specialty.F2G ? Specialty.F2 : contract.specialty }_${contract.programType}_${contract.studyForm === StudyForm.REMOTE ? StudyForm.FULL_TIME : contract.studyForm}_${contract.paymentType}.docx`, {
      entrant: entrantData,
      representative: representativeData,
      customer: user.customerData ? this.formatPersonalData(user.customerData) : user.representativeData ? representativeData : entrantData,
      number: contract.number,
      date: contract.date,
    });

    return {
      fileName: 'Payment.docx',
      contentType: this.DOCX,
      data: paymentFile,
    };
  }

  async downloadPriority (id: string): Promise<FileDto> {
    const contract = await this.documentRepo.find({ id });
    const user = await this.userRepo.find({ id: contract.userId });

    const priorities = {};
    contract.priorities.forEach((priority) => {
      priorities[priority.program] = priority.number;
    });

    const priorityFile = this.fileService.fillTemplate(`Пріоритетка_${contract.specialty}.docx`, {
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      ...priorities,
      day: contract.priorityDate.slice(0, 2),
    });

    return {
      fileName: 'Priority.docx',
      contentType: this.DOCX,
      data: priorityFile,
    };
  }

  async updateDocuments (id: string, data: UpdateContractDto): Promise<ContractDto> {
    const { priorities, ...contract } = data;
    const currentContract = await this.documentRepo.find({ id });
    const user = await this.userRepo.find({ id: currentContract.userId });

    if (contract.number && contract.date && currentContract.state !== DocumentState.APPROVED) {
      contract.state = DocumentState.APPROVED;
      TelegramAPI.sendContract({
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        specialty: contract.specialty ?? currentContract.specialty,
        contractNumber: contract.number,
        competitivePoint: user.competitivePoint,
        date: contract.date,
      });
    }

    return this.documentRepo.updateById(id, {
      ...contract,
      priorities: priorities ? {
        deleteMany: {},
        createMany: {
          data: priorities,
        },
      } : undefined,
    });
  }

  async deleteDocuments (id: string): Promise<ContractDto> {
    return this.documentRepo.deleteById(id);
  }
}
