import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Token } from '@prisma/client';

@Injectable()
export class TokenRepo {
  constructor (
    private readonly prisma: PrismaService,
  ) {}

  async deleteMany (where: Prisma.TokenWhereInput) {
    return this.prisma.token.deleteMany({ where });
  }

  async findMany (args: Prisma.TokenFindManyArgs): Promise<Token[]> {
    return this.prisma.token.findMany(args);
  }

  async deleteByValue (value: string): Promise<Token> {
    return this.prisma.token.delete({
      where: { value },
    });
  }

  async findByValue (value: string): Promise<Token> {
    return this.prisma.token.findFirst({
      where: { value },
    });
  }
}