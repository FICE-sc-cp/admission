import {
  AddUserToQueueBody,
  GetQueueRes,
  GetQueueUsersRes,
  UpdateQueueBody,
  UpdateQueueUserBody,
} from './queue-api.types';
import { instance } from '../instance';
import { QueuePositionStatus, QueueUser } from '@/lib/types/queue.types';

class QueueApi {
  async get() {
    return await instance.get<GetQueueRes>('/queue');
  }

  async edit(body: UpdateQueueBody) {
    return await instance.patch('/queue', body);
  }

  async getUsers(status: QueuePositionStatus, limit: number, skip: number) {
    return await instance.get<GetQueueUsersRes>('/queue/users', {
      params: {
        limit,
        skip,
        status,
      },
    });
  }

  async getUser(id: string) {
    return await instance.get<QueueUser>(`/queue/users/${id}`);
  }

  async addUser(id: string, body: AddUserToQueueBody) {
    return await instance.post(`/queue/users/${id}`, body);
  }

  async deleteUser(id: string) {
    return await instance.delete(`/queue/users/${id}`);
  }

  async editUser(id: string, body: UpdateQueueUserBody) {
    return await instance.patch(`/queue/users/${id}`, body);
  }
}

export const queueApi = new QueueApi();
