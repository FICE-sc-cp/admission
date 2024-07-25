import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserMapper } from '../users/user.mapper';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorWithValidationsResponse } from '../../globals/responses/error-with-validations.response';
import { MessageResponse } from '../../globals/responses/message.response';
import { RegistrationDto } from './dto/registration.dto';
import { ErrorResponse } from '../../globals/responses/error.response';
import { EmailDto } from './dto/email.dto';
import { UserResponse } from './responses/user.response';
import { TokenDto } from './dto/token.dto';
import { FastifyReply } from 'fastify';
import { AuthGuard } from './guards/auth.guard';
import { ConfigService } from '@nestjs/config';

@ApiTags('Auth')
@Controller({
  path: '/auth',
})
export class AuthController {
  constructor (
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly userMapper: UserMapper,
  ) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({ type: MessageResponse })
  @ApiBadRequestResponse({
    type: ErrorWithValidationsResponse,
    description: `
      User with such email already exists
      Invalid request data`,
  })
  async register (
    @Body() data: RegistrationDto,
  ): Promise<MessageResponse> {
    return this.authService.register(data);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiCreatedResponse({ type: MessageResponse })
  @ApiBadRequestResponse({
    type: ErrorWithValidationsResponse,
    description: `
      Invalid request data`,
  })
  @ApiNotFoundResponse({
    type: ErrorResponse,
    description: `
      User with such email does not exist`,
  })
  async login (
    @Body() data: EmailDto,
  ): Promise<MessageResponse> {
    return this.authService.login(data);
  }

  @Post('/verify')
  @ApiOperation({ summary: 'Verify user' })
  @ApiCreatedResponse({ type: UserResponse })
  @ApiBadRequestResponse({
    type: ErrorWithValidationsResponse,
    description: `
      Invalid request data`,
  })
  @ApiNotFoundResponse({
    type: ErrorResponse,
    description: `
      Token not found`,
  })
  async verify (
    @Body() { token }: TokenDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<UserResponse> {
    const data = await this.authService.verify(token);
    reply.setCookie('session', data.session, this.configService.get<string>('nodeEnv') !== 'local' ? {
      httpOnly: true,
      secure: true,
      maxAge: 38530000,
      partitioned: true,
      path: '/',
      sameSite: 'none',
    } : {
      httpOnly: false,
      secure: false,
      maxAge: 38530000,
      path: '/',
      sameSite: false,
    });
    return this.userMapper.getUser(data.user);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current user' })
  @ApiOkResponse({ type: UserResponse })
  @ApiUnauthorizedResponse({
    type: ErrorResponse,
    description: `
      Unauthorized`,
  })
  async me (
    @Req() request: any,
  ): Promise<UserResponse> {
    return this.userMapper.getUser(request.user);
  }
}
