import { instance } from '../instance';
import { LoginBody, RegisterBody } from './auth-api.types';
import { MessageResponse } from '../api-common.types';
import { User } from '@/lib/types/auth.types';

class AuthApi {
  async register(body: RegisterBody) {
    return await instance.post<MessageResponse>('/auth/register', body);
  }

  async login(body: LoginBody) {
    return await instance.post<MessageResponse>('/auth/login', body);
  }

  async logout() {
    return await instance.post<MessageResponse>('/auth/logout');
  }

  async verify(token: string) {
    return await instance.post<User>('/auth/verify', { token });
  }

  async getMe() {
    return await instance.get<User>('/auth/me');
  }
}

export const authApi = new AuthApi();
