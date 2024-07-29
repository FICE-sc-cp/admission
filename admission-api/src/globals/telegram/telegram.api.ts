import axios from 'axios';
import { GoingUserDto } from '../../api/queue/dtos/going-user.dto';
import { RegistrationInQueueDto } from '../../api/queue/dtos/registration-in-queue.dto';
import { SendContractTelegramDto } from 'src/api/documents/dto/send-contract-telegram.dto';

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

  static async sendContract (data: SendContractTelegramDto) {
    try {
      await client.post('/sendContract', data);
    } catch (err) {
      console.log(err);
    }
  }

  static async sendGoingUser (entrant: GoingUserDto) {
    try {
      await client.post('/sendGoingUser', entrant);
    } catch (err) {
      console.log(err);
    }
  }

  static async sendRegistrationInQueue (entrant: RegistrationInQueueDto) {
    try {
      await client.post('/sendRegistrationInQueue', entrant);
    } catch (err) {
      console.log(err);
    }
  }
}
