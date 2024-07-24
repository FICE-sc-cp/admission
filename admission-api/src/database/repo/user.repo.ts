import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Role, User } from '@prisma/client';
import { UserDto } from '../../api/users/dtos/user.dto';

@Injectable()
export class UserRepo {
  constructor (
    private readonly prisma: PrismaService,
  ) {}

  private include = {
    contracts: true,
    entrantData: true,
    representativeData: true,
    customerData: true,
    userPriorities: {
      include: {
        priorities: true,
      },
    },
  };

  async create (data: Prisma.UserUncheckedCreateInput): Promise<UserDto> {
    return this.prisma.user.create({ data, include: this.include });
  }

  async find (where: Prisma.UserWhereInput): Promise<UserDto> {
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

  async getOrCreate (data: { firstName: string, middleName?: string, lastName: string, email: string, role: Role }): Promise<UserDto> {
    let user = await this.find(data);
    if (!user) {
      user = await this.create(data);
    }
    return user;
  }
}
