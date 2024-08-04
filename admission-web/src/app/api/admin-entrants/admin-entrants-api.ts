import { instance } from '@/app/api/instance';
import { MessageResponse } from '@/app/api/api-common.types';
import { AdminUser } from './admin-entrants-api.types';

class AdminEntrantsApi {
  async getUsers() {
    return await instance.get<AdminUser[]>('/users');
  }
  async deleteEntrant(id: string) {
    return await instance.delete<MessageResponse>(`/users/${id}`);
  }
}

export default new AdminEntrantsApi();
