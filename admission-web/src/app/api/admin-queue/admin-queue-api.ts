import { instance } from '@/app/api/instance';
import { MessageResponse } from '@/app/api/api-common.types';
import {
  OpenQueue,
  Positions,
  UpdateUser,
} from '@/app/api/admin-queue/admin-queue-api.types';

class AdminQueueApi {
  async getUsers() {
    return await instance.get<Positions>('/queue/users');
  }

  async changePosition(id: string, body: UpdateUser) {
    await instance.patch(`/queue/users/${id}`, body);
  }

  async deleteEntrant(id: string) {
    return await instance.delete<MessageResponse>(`/queue/users/${id}`);
  }

  async openQueue(body: OpenQueue) {
    return await instance.patch(`/queue`, body);
  }

  async cleanUpTheQueue() {
    return await instance.delete<MessageResponse>(`/queue/users`);
  }
}

export default new AdminQueueApi();
