import { Module } from '@nestjs/common';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';

@Module({
  providers: [UserMapper, UserService],
  exports: [UserMapper, UserService],
})
export class UserModule {}
