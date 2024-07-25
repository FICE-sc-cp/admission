import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepo } from './repo/user.repo';
import { TokenRepo } from './repo/token.repo';
import { DocumentRepo } from './repo/document.repo';

@Module({
  providers: [PrismaService, UserRepo, TokenRepo, DocumentRepo],
  exports: [PrismaService, UserRepo, TokenRepo, DocumentRepo],
})
export class DatabaseModule {}
