import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SmtpConfiguration } from './smtp-configuration';

@Module({
  providers: [SmtpConfiguration, ConfigService],
  exports: [SmtpConfiguration, ConfigService],
})
export class ConfigurationModule extends ConfigModule {}