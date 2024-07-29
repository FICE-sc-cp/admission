import { User } from '@/app/api/admin-entrants/admin-entrants-api.types';
import { instance } from '@/app/api/instance';
import { MessageResponse } from '@/app/api/api-common.types';

class AdminEntrantsApi {
  async getUsers(): Promise<User[]> {
    const { data } = await instance.get('/users');
    return data;
  }
  async deleteEntrant(id: string) {
    await instance.delete<MessageResponse>(`/users/${id}`);
  }
}

export default new AdminEntrantsApi();
