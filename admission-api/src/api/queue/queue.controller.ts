import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { QueueService } from './queue.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { UpdateQueueDto } from './dtos/update-queue.dto';
import { UpdateQueuePositionDto } from './dtos/update-queue-position.dto';
import { GetUsersQuery } from './queries/get-users.query';
import { JoinQueueDto } from './dtos/join-queue.dto';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MultipleAccesses } from '../auth/decorators/multiple-accesses.decorator';
import { TelegramGuard } from '../auth/guards/telegram.guard';
import { MultipleAccessGuard } from '../auth/guards/multiple-access.guard';
import { AdminOrMeGuard } from '../auth/guards/admin-or-me.guard';
import { QueuePositionDto } from './dtos/queue-position.dto';
import { QueueDto } from './responses/queue.dto';
import { RelativePositionsDto } from './responses/relative-positions.dto';

@ApiTags('Queue')
@Controller({
  path: 'queue',
})
export class QueueController {
  constructor (private readonly queueService: QueueService) {}

  @ApiOperation({ summary: 'Get general info about queue' })
  @Get()
  @ApiResponse({ type: QueueDto })
  getQueue () {
    return this.queueService.getQueue();
  }

  @ApiOperation({ summary: 'Join queue by user id' })
  @Post('users/:userId')
  @MultipleAccesses(TelegramGuard, [AuthGuard, AdminOrMeGuard])
  @UseGuards(MultipleAccessGuard)
  @ApiResponse({ type: QueuePositionDto })
  joinQueue (@Param('userId') userId: string, @Body() body: JoinQueueDto) {
    return this.queueService.joinQueue(userId, body);
  }

  @ApiOperation({ summary: 'Quit queue' })
  @Delete('users/:userId')
  @MultipleAccesses(TelegramGuard, [AuthGuard, AdminOrMeGuard])
  @UseGuards(MultipleAccessGuard)
  @ApiOkResponse()
  quitQueue (@Param('userId') userId: string) {
    return this.queueService.quitQueue(userId);
  }

  @ApiOperation({ summary: 'Get users for queue admin panel' })
  @Get('users')
  @Roles([Role.ADMIN])
  @UseGuards(AuthGuard)
  @ApiResponse({ type: RelativePositionsDto })
  getUsers (@Query() query: GetUsersQuery) {
    return this.queueService.getUsers(query);
  }

  @ApiOperation({ summary: 'Update parameters about queue' })
  @Patch()
  @Roles([Role.ADMIN])
  @UseGuards(AuthGuard)
  @ApiResponse({ type: QueueDto })
  updateQueue (@Body() body: UpdateQueueDto) {
    return this.queueService.updateQueue(body);
  }

  @ApiOperation({ summary: 'Update user info by user id' })
  @Patch('users/:userId')
  @Roles([Role.ADMIN])
  @UseGuards(AuthGuard)
  @ApiResponse({ type: QueuePositionDto })
  updateUser (@Param('userId') userId: string, @Body() body: UpdateQueuePositionDto) {
    return this.queueService.updatePosition(userId, body);
  }

  @ApiOperation({ summary: 'Get user queue position by id' })
  @Get('users/:userId')
  @UseGuards(AuthGuard, AdminOrMeGuard)
  @ApiResponse({ type: QueuePositionDto })
  getUser (@Param('userId') userId: string) {
    return this.queueService.getUser(userId);
  }
}
