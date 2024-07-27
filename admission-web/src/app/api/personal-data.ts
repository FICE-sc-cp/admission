import instance from '@/lib/api/instance';
import { PersonalDataBody } from '@/lib/api/types/personal-data-type';

class PersonalDataApi {
  async updatePersonalData(body: PersonalDataBody, userId: string) {
    return await instance.patch(`/users/${userId}`, body);
  }
}

export default new PersonalDataApi();
