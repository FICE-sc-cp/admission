import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { FileModule } from 'src/globals/files/file.module';
import { EmailModule } from '../email/email.module';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigurationModule } from 'src/configuration/configuration.module';

@Module({
  providers: [DocumentService],
  controllers: [DocumentController],
  exports: [DocumentService],
  imports: [FileModule, EmailModule, DatabaseModule, ConfigurationModule],
})
export class DocumentModule {}
