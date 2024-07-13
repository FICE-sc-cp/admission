import instance from '@/lib/api/instance';
import { LoginBody, RegisterBody, RegisterResponse } from '@/lib/api/types';

class AuthApi {
  async register(body: RegisterBody) {
    return await instance.post<RegisterResponse>('/auth/register', body);
  }

  async login(body: LoginBody) {
    await instance.post('/auth/login', body);
  }

  async verify(token: string) {
    const response = await instance.post(
      '/auth/verify',
      { token },
      {
        withCredentials: true,
      }
    );
    return response;
  }

  async getMe() {
    return await instance.get('/auth/me', {
      withCredentials: true,
    });
  }
}

export default new AuthApi();
