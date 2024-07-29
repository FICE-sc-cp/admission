import { instance } from '@/app/api/instance';
import { MessageResponse } from '@/app/api/api-common.types';
import {
  OpenQueue,
  Positions,
  UpdateUser,
} from '@/app/api/admin-queue/admin-queue-api.types';

class AdminQueueApi {
  async getUsers(): Promise<Positions> {
    const { data } = await instance.get('/queue/users');
    return data;
  }

  async changePosition(id: string, body: UpdateUser) {
    await instance.patch(`/queue/users/${id}`, body);
  }

  async deleteEntrant(id: string) {
    await instance.delete<MessageResponse>(`/queue/users/${id}`);
  }

  async openQueue(body: OpenQueue) {
    await instance.patch(`/queue`, body);
  }

  async cleanUpTheQueue() {
    await instance.delete<MessageResponse>(`/queue/queue/users`);
  }
}

export default new AdminQueueApi();
