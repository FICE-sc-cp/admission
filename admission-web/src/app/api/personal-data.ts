import instance from '@/lib/api/instance';
import { PersonalDataBody } from '@/lib/api/types/personal-data-type';

class PersonalDataApi {
  async updatePersonalData(body: PersonalDataBody) {
    return await instance.patch(`/users/${body.entrantData?.userId}`, body);
  }
}

export default new PersonalDataApi();
