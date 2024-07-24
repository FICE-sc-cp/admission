import { Module } from '@nestjs/common';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  providers: [UserMapper, UserService],
  exports: [UserMapper, UserService],
  imports: [DatabaseModule],
})
export class UserModule {}
