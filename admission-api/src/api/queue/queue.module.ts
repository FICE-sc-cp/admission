import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { TelegramGuard } from '../auth/guards/telegram.guard';
import { MultipleAccessGuard } from '../auth/guards/multiple-access.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminOrMeGuard } from '../auth/guards/admin-or-me.guard';

@Module({
  imports: [DatabaseModule],
  exports: [QueueService],
  providers: [QueueService, TelegramGuard, MultipleAccessGuard, AuthGuard, AdminOrMeGuard],
  controllers: [QueueController],
})
export class QueueModule {}
