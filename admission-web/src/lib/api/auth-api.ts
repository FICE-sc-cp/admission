import instance from '@/lib/api/instance';
import { LoginBody, RegisterBody, RegisterResponse } from '@/lib/api/types';
import { User } from '@/schemas-and-types/auth';

class AuthApi {
  async register(body: RegisterBody) {
    return await instance.post<RegisterResponse>('/auth/register', body);
  }

  async login(body: LoginBody) {
    return await instance.post('/auth/login', body);
  }

  async logout() {
    return await instance.post('/auth/logout');
  }

  async verify(token: string) {
    return await instance.post<User>('/auth/verify', { token });
  }

  async getMe() {
    return await instance.get('/auth/me');
  }
}

export default new AuthApi();
