import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { QueuePositionStatus, User } from '@prisma/client';
import { UpdateQueueDto } from './dtos/update-queue.dto';
import { UpdateQueuePositionDto } from './dtos/update-queue-position.dto';
import { GetUsersQuery } from './queries/get-users.query';
import { JoinQueueDto } from './dtos/join-queue.dto';

interface IMessageData {
  queue: string;
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
  [MessageType.PROCESSING]: (d: IMessageData) => `<b>${d.queue}</b>\n\nВаша заявка вже оброблюється оператором. Можете заходити до корпусу.\n\n<b>\nВаш номер: ${d.code}</b>`,
  [MessageType.MOVED]: (d: IMessageData) => `<b>${d.queue}</b>\n\nВашу заявку посунули у черзі на ${d.delta} позицій ${d.delta > 0 ? 'назад' : 'вперед'}.`,
  [MessageType.POSITION]: (d: IMessageData) => `<b>${d.queue}</b>\n\nВаша позиція у черзі: <b>${d.position}</b>\nНе відходьте далеко від корпусу.`,
  [MessageType.DELETED]: (d: IMessageData) => `<b>${d.queue}</b>\n\nДякую за користування нашою електронною чергою.`,
};


@Injectable()
export class QueueService implements OnModuleInit {
  constructor (
    private readonly prisma: PrismaService,
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
    };
  }

  updateQueue ({ opened }: UpdateQueueDto) {
    this.opened = opened;
  }

  async getUsers (query: GetUsersQuery) {
    const positions = await this.prisma.queuePosition.findMany({
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
        relativePosition: await this.getRelativePositions(position.position),
      });
    }

    newPositions.sort((a, b) => a.relativePosition - b.relativePosition);

    return {
      positions: newPositions.splice(query.skip, query.take),
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

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: body,
    });

    return {
      position: await this.prisma.queuePosition.create({
        data: {
          userId,
          code,
          position: code,
        },
      }),
    };
  }

  async quitQueue (userId: string) {
    await this.prisma.queuePosition.deleteMany({
      where: {
        userId,
      },
    });

    //TODO message TG with deleting
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

    // TODO notify queue if status changed or moved

    // TODO send message about moving

    // TODO send message about moving to telegram chat

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

        // TODO send position to user
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

  async sendMessage (user: User, type: MessageType, data: IMessageData) {
    if (!user.telegramId) return;

    const text = messages[type](data);
    // TODO send text to user
  }
}
