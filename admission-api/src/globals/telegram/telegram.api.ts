import axios from 'axios';
import { UserDto } from '../../api/users/dtos/user.dto';

const ADMISSION_BOT_API = process.env.ADMISSION_BOT_API;
const ADMISSION_BOT_TOKEN = process.env.ADMISSION_BOT_TOKEN;

const client = axios.create({
  baseURL: ADMISSION_BOT_API,
  headers: {
    Authorization: `Bearer ${ADMISSION_BOT_TOKEN}`,
  },
});

export class TelegramAPI {
  static async sendMessage (id: bigint, text: string, parseMode: 'HTML' | 'Markdown' = undefined) {
    try {
      await client.post('/sendMessage', {}, {
        params: {
          uid: id,
          text,
          parse_mode: parseMode,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async sendContract (entrant: UserDto) {
    try {
      await client.post('/sendContract', entrant);
    } catch (err) {
      console.log(err);
    }
  }

  static async sendGoingUser (entrant: UserDto) {
    try {
      await client.post('/sendGoingUser', entrant);
    } catch (err) {
      console.log(err);
    }
  }

  static async sendRegistrationInQueue (entrant: UserDto) {
    try {
      await client.post('/sendRegistrationInQueue', entrant);
    } catch (err) {
      console.log(err);
    }
  }
}
