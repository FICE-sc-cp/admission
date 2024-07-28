<<<<<<< HEAD
import { GetPersonalData, PersonalDataBody } from './personal-data-type';
=======
import { PersonalDataBody } from './personal-data-type';
>>>>>>> d0eb6d3 (feature/personal-data-page (#42))
import { instance } from '@/app/api/instance';

class PersonalDataApi {
  async updatePersonalData(body: PersonalDataBody, userId: string) {
    return await instance.patch(`/users/${userId}`, body);
  }
<<<<<<< HEAD

  async getPersonalData(userId: string) {
    const personalData = await instance.get<GetPersonalData>(
      `/users/${userId}`
    );
    return personalData;
  }
=======
>>>>>>> d0eb6d3 (feature/personal-data-page (#42))
}

export default new PersonalDataApi();
