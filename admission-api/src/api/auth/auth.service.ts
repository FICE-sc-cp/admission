import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UserRepo } from '../../database/repo/user.repo';
import {
  AUTH_LINK_IS_SENT_MSG,
  TOKEN_NOT_FOUND_MSG,
  USER_WITH_SUCH_EMAIL_ALREADY_EXISTS_MSG,
  USER_WITH_SUCH_EMAIL_DOES_NOT_EXIST_MSG,
} from './constants';
import { v4 } from 'uuid';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import { TokenType } from '@prisma/client';
import { TokenRepo } from '../../database/repo/token.repo';
import { MessageResponse } from '../../globals/responses/message.response';
import { EmailDto } from './dto/email.dto';
import { Request, Response } from 'express';

const SESSIONS = 5;

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly tokenRepo: TokenRepo,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async register(data: RegistrationDto): Promise<MessageResponse> {
    const user = await this.userRepo.find({ email: data.email });
    if (user)
      throw new BadRequestException(USER_WITH_SUCH_EMAIL_ALREADY_EXISTS_MSG);
    const { id } = await this.userRepo.create(data);
    const token = await this.generateToken(id);
    await this.sendAuthLink(data.email, token);
    return { message: AUTH_LINK_IS_SENT_MSG };
  }

  private async generateToken(userId: string): Promise<string> {
    const token = v4();
    await this.tokenRepo.deleteMany({ userId, type: TokenType.OTP });
    await this.userRepo.updateById(userId, {
      tokens: {
        create: {
          value: token,
          type: TokenType.OTP,
        },
      },
    });
    return token;
  }

  private async sendAuthLink(email: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get<string>('frontendUrl');
    await this.emailService.sendEmail({
      to: email,
      subject: 'Кабінет вступника | Вхід',
      message:
        'Для входу до кабінету вступника використовуйте посилання нижче:',
      link: `${frontendUrl}/auth/${token}`,
    });
  }

  async verify(token: string) {
    const user = await this.userRepo.find({
      tokens: {
        some: {
          value: token,
          type: TokenType.OTP,
        },
      },
    });
    if (!user) throw new NotFoundException(TOKEN_NOT_FOUND_MSG);
    const session = await this.createAuthSession(user.id);
    return { user, session };
  }

  private async createAuthSession(userId: string): Promise<string> {
    const token = v4();
    await this.decrementSessions(userId);
    await this.userRepo.updateById(userId, {
      tokens: {
        create: {
          value: token,
          type: TokenType.SESSION,
        },
      },
    });

    return token;
  }

  private async decrementSessions(userId: string) {
    const tokens = await this.tokenRepo.findMany({
      where: {
        userId,
        type: TokenType.SESSION,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (tokens.length >= SESSIONS) {
      const { value } = tokens[0];
      await this.tokenRepo.deleteByValue(value);
    }
  }

  async login({ email }: EmailDto) {
    const user = await this.userRepo.find({ email });
    if (!user)
      throw new NotFoundException(USER_WITH_SUCH_EMAIL_DOES_NOT_EXIST_MSG);
    const token = await this.generateToken(user.id);
    await this.sendAuthLink(email, token);
    return { message: AUTH_LINK_IS_SENT_MSG };
  }

  async logout(req: Request, res: Response) {
    const token = req.cookies['session'];
    await this.tokenRepo.deleteByValue(token);

    res.clearCookie(
      'session',
      this.configService.get<string>('nodeEnv') !== 'local'
        ? {
            httpOnly: true,
            secure: true,
            maxAge: 38530000,
            path: '/',
            sameSite: 'none',
          }
        : {
            httpOnly: false,
            secure: false,
            path: '/',
            sameSite: false,
          },
    );

    return { message: 'success' };
  }
}
