import { GetPersonalData, PersonalDataBody } from './personal-data-type';

import { instance } from '@/app/api/instance';

class PersonalDataApi {
  async updatePersonalData(body: PersonalDataBody, userId: string) {
    return await instance.patch(`/users/${userId}`, body);
  }

  async getPersonalData(userId: string) {
    const personalData = await instance.get<GetPersonalData>(
      `/users/${userId}`
    );
    return personalData;
  }

  async deletePersonalData(userId: string) {
    await instance.delete(`/users/${userId}`);
  }
}

export default new PersonalDataApi();
