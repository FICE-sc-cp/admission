import { Body, Controller, ForbiddenException, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from '@prisma/client';
import { UserDto } from './dtos/user.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller({
  path: 'users',
})
export class UserController {
  constructor (
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Update user personal data' })
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update (@Param('id') id: string, @Body() body: UpdateUserDto, @Req() req: any) {
    const requester = req.user;
    if (requester.role === Role.ADMIN || requester.id === id) {
      return this.userService.updateById(id, body);
    } else {
      throw new ForbiddenException('No access');
    }
  }

  @ApiOperation({ summary: 'Get user info, personal data, contracts and priorities' })
  @ApiResponse({ type: UserDto })
  @UseGuards(AuthGuard)
  @Get(':id')
  getProfile (@Param('id') id: string, @Req() req: any) {
    const requester = req.user;
    if (requester.role === Role.ADMIN || requester.id === id) {
      return this.userService.getProfile(id);
    } else {
      throw new ForbiddenException('No access');
    }
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: UserDto, isArray: true })
  @Roles([Role.ADMIN])
  @UseGuards(AuthGuard)
  getAll () {
    //TODO pagination MUST HAVE
    return this.userService.getAll();
  }
}
