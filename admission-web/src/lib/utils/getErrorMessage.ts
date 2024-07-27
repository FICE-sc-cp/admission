import { isAxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
  let message = 'Виникла невідома помилка';

  if (isAxiosError(error)) {
    const axiosError = error;

    if (axiosError.response) {
      const { data, status, statusText } = axiosError.response;
      if (data?.message) {
        message = data.message;
      } else if (data?.messages && Array.isArray(data.messages)) {
        message = data.messages
          .map((msg: string) => {
            const parts = msg.split(':');
            return parts.length > 1 ? parts[1].trim() : msg.trim();
          })
          .join(', ');
      } else {
        message = `Запит не вдалося виконати зі статусом ${status} - ${statusText}`;
      }
    } else if (axiosError.request) {
      message = 'Не отримано відповіді від сервера';
    } else {
      message = axiosError.message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  return message;
}
