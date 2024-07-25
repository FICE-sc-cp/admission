import { Injectable } from '@nestjs/common';
import { DocumentRepo } from 'src/database/repo/document.repo';
import { ContractDto } from './dto/contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { CreateContractDto } from './dto/create-contract.dto';

@Injectable()
export class DocumentService {
  constructor (
    private readonly documentRepo: DocumentRepo,
  ) {}

  async createDocuments (data: CreateContractDto): Promise<ContractDto> {
    const { priorities, ...contract } = data;
    return this.documentRepo.create({
      ...contract,
      priorities: {
        createMany: {
          data: priorities,
        },
      },
    });
  }

  async updateDocuments (id: string, data: UpdateContractDto): Promise<ContractDto> {
    const { priorities, ...contract } = data;
    return this.documentRepo.updateById(id, {
      ...contract,
      priorities: {
        deleteMany: {},
        createMany: {
          data: priorities,
        },
      },
    });
  }

  async deleteDocuments (id: string): Promise<ContractDto> {
    return this.documentRepo.deleteById(id);
  }
}
