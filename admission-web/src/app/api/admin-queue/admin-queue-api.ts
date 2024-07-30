import { instance } from '@/app/api/instance';
import { MessageResponse } from '@/app/api/api-common.types';
import { UpdateUser } from '@/app/api/admin-queue/admin-queue-api.types';
import {
  GetQueueUsersRes,
  UpdateQueueBody,
} from '@/app/api/queue/queue-api.types';

class AdminQueueApi {
  async getUsers(): Promise<GetQueueUsersRes> {
    const { data } = await instance.get('/queue/users');
    return data;
  }

  async changePosition(id: string, body: UpdateUser) {
    return await instance.patch(`/queue/users/${id}`, body);
  }

  async deleteEntrant(id: string) {
    return await instance.delete<MessageResponse>(`/queue/users/${id}`);
  }

  async openQueue(body: UpdateQueueBody) {
    return await instance.patch(`/queue`, body);
  }

  async cleanUpTheQueue() {
    return await instance.delete<MessageResponse>(`/queue/queue/users`);
  }
}

export default new AdminQueueApi();
