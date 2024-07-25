import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';

@Module({
  imports: [DatabaseModule],
  exports: [QueueService],
  providers: [QueueService],
  controllers: [QueueController],
})
export class QueueModule {}
