import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from '@prisma/client';
import { UserDto } from './dtos/user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUsersQuery } from './queries/get-users.query';
import { AdminOrMeGuard } from '../auth/guards/admin-or-me.guard';

@ApiTags('User')
@Controller({
  path: 'users',
})
export class UserController {
  constructor (
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Update user personal data' })
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(AuthGuard, AdminOrMeGuard)
  @Patch(':userId')
  update (@Param('userId') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateById(id, body);
  }

  @ApiOperation({ summary: 'Get user info, personal data, contracts and priorities' })
  @ApiResponse({ type: UserDto })
  @UseGuards(AuthGuard, AdminOrMeGuard)
  @Get(':userId')
  getProfile (@Param('userId') id: string) {
    return this.userService.getProfile(id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: UserDto, isArray: true })
  @Roles([Role.ADMIN])
  @UseGuards(AuthGuard)
  @Get()
  getAll (@Query() query: GetUsersQuery) {
    return this.userService.getAll(query);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @Roles([Role.ADMIN])
  @UseGuards(AuthGuard)
  @Delete(':userId')
  deleteById (@Param('userId') id: string) {
    return this.userService.deleteById(id);
  }
}
