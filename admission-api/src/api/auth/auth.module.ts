import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module';
import { DatabaseModule } from '../../database/database.module';
import { EmailModule } from '../email/email.module';
import { ConfigurationModule } from '../../configuration/configuration.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserModule, DatabaseModule, EmailModule, ConfigurationModule],
})
export class AuthModule {}
