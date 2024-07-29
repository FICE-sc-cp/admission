import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { QueuePositionStatus } from '@prisma/client';
import { UpdateQueueDto } from './dtos/update-queue.dto';
import { UpdateQueuePositionDto } from './dtos/update-queue-position.dto';
import { GetUsersQuery } from './queries/get-users.query';
import { JoinQueueDto } from './dtos/join-queue.dto';
import { TelegramAPI } from '../../globals/telegram/telegram.api';
import { UserRepo } from '../../database/repo/user.repo';

interface IMessageData {
  position?: number;
  delta?: number;
  code?: number;
}

export enum MessageType {
  PROCESSING,
  MOVED,
  POSITION,
  DELETED,
}

const messages = {
  [MessageType.PROCESSING]: (d: IMessageData) => `Ваша заявка вже оброблюється оператором. Можете заходити до корпусу.\n\n<b>\nВаш номер: ${d.code}</b>`,
  [MessageType.MOVED]: (d: IMessageData) => `Вашу заявку посунули у черзі на ${d.delta} позицій ${d.delta > 0 ? 'назад' : 'вперед'}.`,
  [MessageType.POSITION]: (d: IMessageData) => `Ваша позиція у черзі: <b>${d.position}</b>\nНе відходьте далеко від корпусу.`,
  [MessageType.DELETED]: () => 'Дякую за користування нашою електронною чергою.\n\nПриєднуйтеся до чату вступників @abit_fice',
};

@Injectable()
export class QueueService implements OnModuleInit {
  constructor (
    private readonly prisma: PrismaService,
    private readonly userRepo: UserRepo,
  ) {}

  lastPosition: number = 0;
  opened: boolean = false;
  include = {
    user: true,
  };

  async getQueue () {
    const queueSize = await this.prisma.queuePosition.count({
      where: {
        status: QueuePositionStatus.WAITING,
      },
    });

    return {
      queueSize,
      lastPosition: this.lastPosition,
      opened: this.opened,
    };
  }

  updateQueue ({ opened }: UpdateQueueDto) {
    this.opened = opened;

    return {
      lastPosition: this.lastPosition,
      opened: this.opened,
    };
  }

  async getUsers ({ skip = 0, take = 5000, status }: GetUsersQuery) {
    const positions = await this.prisma.queuePosition.findMany({
      where: {
        status,
      },
      include: this.include,
      orderBy: [{
        position: 'asc',
      }, {
        updatedAt: 'asc',
      }],
    });

    const newPositions = [];

    for (const position of positions) {
      newPositions.push({
        ...position,
        relativePosition: position.status === QueuePositionStatus.PROCESSING ? 0 : await this.getRelativePositions(position.position),
      });
    }

    newPositions.sort((a, b) => a.relativePosition - b.relativePosition);

    return {
      positions: newPositions.splice(skip, take),
    };
  }

  async getRelativePositions (positions: number) {
    return this.prisma.queuePosition.count({
      where: {
        status: QueuePositionStatus.WAITING,
        position: {
          lte: positions,
        },
      },
    });
  }

  async joinQueue (userId: string, body: JoinQueueDto) {
    if (!this.opened) {
      throw new BadRequestException('Queue is closed');
    }

    const queuePosition = await this.prisma.queuePosition.findFirst({
      where: {
        userId,
      },
    });

    if (queuePosition) {
      throw new BadRequestException('Already in queue');
    }

    const code = this.generatePosition();

    await this.prisma.user.updateMany({
      where: {
        id: userId,
      },
      data: body,
    });

    const user = await this.userRepo.find({ id: userId });
    await TelegramAPI.sendRegistrationInQueue({
      lastName: user.lastName,
      is_dorm: user.isDorm,
      email: user.email,
      expectedSpecialities: user.expectedSpecialities,
      telegramId: user.telegramId ? String(user.telegramId) : null,
      firstName: user.firstName,
      middleName: user.middleName,
      phone: user.phone,
      printedEdbo: user.printedEdbo,
      id: user.id,
    });

    return this.prisma.queuePosition.create({
      data: {
        userId,
        code,
        position: code,
      },
    });
  }

  async quitQueue (userId: string) {
    await this.prisma.queuePosition.deleteMany({
      where: {
        userId,
      },
    });

    await this.sendMessage(userId, MessageType.DELETED, {});
  }

  generatePosition () {
    return ++this.lastPosition;
  }

  async updatePosition (userId: string, data: UpdateQueuePositionDto) {
    const position = await this.prisma.queuePosition.findFirst({
      where: {
        userId,
      },
    });

    let newPosition = undefined;

    if (data.delta) {
      const relativePositions = await this.getRelativePositions(position.position);
      const after = await this.prisma.queuePosition.findMany({
        skip: relativePositions,
        take: data.delta,
      });

      newPosition = after[data.delta - 1].position;
    }

    await this.prisma.queuePosition.updateMany({
      where: {
        userId,
      },
      data: {
        position: newPosition,
        status: data.status,
      },
    });

    if (data.delta) {
      await this.sendMessage(userId, MessageType.MOVED, { delta: data.delta });
    }

    if (data.status === QueuePositionStatus.PROCESSING) {
      await this.notifyQueue();
      await this.sendMessage(userId, MessageType.PROCESSING, { code: position.code });
      const user = await this.userRepo.find({ id: userId });
      await TelegramAPI.sendGoingUser({
        is_dorm: user.isDorm,
        email: user.email,
        expectedSpecialities: user.expectedSpecialities,
        firstName: user.firstName,
        telegramId: user.telegramId ? String(user.telegramId) : null,
        lastName: user.lastName,
        middleName: user.middleName,
        phone: user.phone,
        printedEdbo: user.printedEdbo,
        id: user.id,
      });
    }

    return this.prisma.queuePosition.findFirst({
      where: {
        userId,
      },
    });
  }

  async notifyQueue () {
    const positions = await this.prisma.queuePosition.findMany({
      where: {
        status: QueuePositionStatus.WAITING,
      },
      include: this.include,
      orderBy: [{
        position: 'asc',
      }, {
        updatedAt: 'asc',
      }],
      take: 20,
    });

    for (let i = 0; i < Math.min(positions.length, 10); i++) {
      const numPosition = i + 1;
      const position = positions[i];

      if (position.lastNotifiedPosition !== numPosition) {
        if (position.lastNotifiedPosition < numPosition || i < 10) {
          this.prisma.queuePosition.update({
            where: {
              id: position.id,
            },
            data: {
              lastNotifiedPosition: numPosition,
            },
          });
        }

        await this.sendMessage(position.userId, MessageType.POSITION, { position: numPosition });
      }
    }
  }

  async onModuleInit () {
    const lastPosition = await this.prisma.queuePosition.findFirst({
      orderBy: {
        code: 'desc',
      },
    });

    this.lastPosition = lastPosition ? lastPosition.code : 0;
  }

  async sendMessage (userId: string, type: MessageType, data: IMessageData) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user.telegramId) return;

    const text = messages[type](data);
    await TelegramAPI.sendMessage(user.telegramId, text, 'HTML');
  }

  async getUser (userId: string) {
    const position = await this.prisma.queuePosition.findFirst({
      where: { userId },
    });
    if (!position) return null;
    const relativePosition = await this.getRelativePositions(position.position);
    return {
      ...position,
      relativePosition,
    };
  }

  removeUsers () {
    return this.prisma.queuePosition.deleteMany();
  }
}
