import { PersonalDataBody } from './personal-data-type';
import { instance } from '@/app/api/instance';

class PersonalDataApi {
  async updatePersonalData(body: PersonalDataBody, userId: string) {
    return await instance.patch(`/users/${userId}`, body);
  }
}

export default new PersonalDataApi();
