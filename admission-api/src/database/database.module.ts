import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepo } from './repo/user.repo';
import { TokenRepo } from './repo/token.repo';

@Module({
  providers: [PrismaService, UserRepo, TokenRepo],
  exports: [PrismaService, UserRepo, TokenRepo],
})
export class DatabaseModule {}
