import { Module } from '@nestjs/common';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';
import { DatabaseModule } from '../../database/database.module';
import { UserController } from './user.controller';

@Module({
  providers: [UserMapper, UserService],
  exports: [UserMapper, UserService],
  imports: [DatabaseModule],
  controllers: [UserController],
})
export class UserModule {}
