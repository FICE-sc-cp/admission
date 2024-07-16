import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Role, User } from '@prisma/client';
import { DbUser } from '../entities/db-user';

@Injectable()
export class UserRepo {
  constructor (
    private readonly prisma: PrismaService,
  ) {}

  private include = {
    contracts: true,
    entrantData: true,
    representativeData: true,
    CustomerData: true,
    entrantPriorities: {
      include: {
        priorities: true,
      },
    },
  };

  async create (data: Prisma.UserUncheckedCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async find (where: Prisma.UserWhereInput): Promise<DbUser> {
    return this.prisma.user.findFirst({
      where,
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.UserUncheckedUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async getOrCreate (data: { firstName: string, middleName?: string, lastName: string, email: string, role: Role }): Promise<DbUser> {
    let user = await this.find(data);
    if (!user) {
      user = await this.create(data);
    }
    return user;
  }
}
