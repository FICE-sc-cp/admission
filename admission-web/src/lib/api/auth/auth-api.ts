import instance from '@/lib/api/instance';
import { LoginBody, RegisterBody, RegisterResponse } from '@/lib/api/types';


class AuthApi {
  async register(body: RegisterBody) {
    return await instance.post<RegisterResponse>('/auth/register', body);
  }

  async login(body: LoginBody) {
    await instance.post('/auth/login', body);
  }
}
