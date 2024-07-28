import { GetPersonalData, PersonalDataBody } from './personal-data-type';
import { instance } from '@/app/api/instance';

class PersonalDataApi {
  async updatePersonalData(body: PersonalDataBody, userId: string) {
    return await instance.patch(`/users/${userId}`, body);
  }

  async getPersonalData(userId) {
    const personalData = await instance.get<GetPersonalData>(
      `/users/${userId}`
    );
    return personalData;
  }
}

export default new PersonalDataApi();
