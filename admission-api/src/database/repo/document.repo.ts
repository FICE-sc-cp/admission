import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { ContractDto } from 'src/api/documents/dto/contract.dto';

@Injectable()
export class DocumentRepo {
  constructor (
    private readonly prisma: PrismaService,
  ) {}

  private include = {
    priorities: true,
  };

  async create (data: Prisma.ContractUncheckedCreateInput): Promise<ContractDto> {
    return this.prisma.contract.create({
      data,
      include: this.include,
    });
  }

  async find (where: Prisma.ContractWhereInput): Promise<ContractDto> {
    return this.prisma.contract.findFirst({
      where,
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.ContractUncheckedUpdateInput): Promise<ContractDto> {
    return this.prisma.contract.update({
      where: {
        id,
      },
      data,
      include: this.include,
    });
  }

  async deleteById (id: string): Promise<ContractDto> {
    return this.prisma.contract.delete({
      where: {
        id,
      },
      include: this.include,
    });
  }
}
