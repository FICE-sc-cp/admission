import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ParseEdboCommand } from './parse-edbo.command';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [ParseEdboCommand],
})
export class CliModule {}
