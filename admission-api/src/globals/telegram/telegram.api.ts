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
    await client.post('/sendMessage', {}, {
      params: {
        uid: id,
        text,
        parse_mode: parseMode,
      },
    });
  }

  static async sendContract (entrant: UserDto) {
    await client.post('/sendContract', entrant);
  }

  static async sendGoingUser (entrant: UserDto) {
    await client.post('/sendGoingUser', entrant);
  }

  static async sendRegistrationInQueue (entrant: UserDto) {
    await client.post('/sendRegistrationInQueue', entrant);
  }
}
