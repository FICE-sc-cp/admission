import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { QueueService } from './queue.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { UpdateQueueDto } from './dtos/update-queue.dto';
import { UpdateQueuePositionDto } from './dtos/update-queue-position.dto';
import { GetUsersQuery } from './queries/get-users.query';
import { JoinQueueDto } from './dtos/join-queue.dto';

@Controller({
  path: 'queue',
})
export class QueueController {
  constructor (private readonly queueService: QueueService) {}

  @Get()
  getQueue () {
    return this.queueService.getQueue();
  }

  @Post('users/:userId')
  @UseGuards(AuthGuard)
  joinQueue (@Param('userId') userId: string, @Body() body: JoinQueueDto) {
    return this.queueService.joinQueue(userId, body);
  }

  @Delete('users/:userId')
  @UseGuards(AuthGuard)
  quitQueue (@Param('userId') userId: string, @Req() req: Request) {
    return this.queueService.quitQueue(userId);
  }

  @Get('users')
  @Roles([Role.ADMIN])
  @UseGuards(AuthGuard)
  getUsers (@Query() query: GetUsersQuery) {
    return this.queueService.getUsers(query);
  }

  @Patch()
  @Roles([Role.ADMIN])
  @UseGuards(AuthGuard)
  updateQueue (@Body() body: UpdateQueueDto) {
    return this.queueService.updateQueue(body);
  }

  @Patch('users/:userId')
  @Roles([Role.ADMIN])
  @UseGuards(AuthGuard)
  updateUser (@Param('userId') userId: string, @Body() body: UpdateQueuePositionDto) {
    return this.queueService.updatePosition(userId, body);
  }
}
