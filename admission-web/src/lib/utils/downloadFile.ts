import {
  DocumentsApiBody,
  DownloadDocument,
} from '@/app/api/documents/documents-api.types';
import { User } from '@/lib/schemas-and-types/auth';
import { mimeType } from '@/lib/schemas-and-types/documents';

export const downloadFile = (
  resData: mimeType,
  user: User | null,
  data: DocumentsApiBody,
  text: string
) => {
  const blob = new Blob([resData], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  const url = window.URL.createObjectURL(blob);

  const tempLink = document.createElement('a');
  tempLink.href = url;
  tempLink.setAttribute(
    'download',
    `${user?.lastName} ${user?.firstName} ${user?.middleName} ${data.specialty} ${text}`
  );

  document.body.appendChild(tempLink);
  tempLink.click();

  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(url);
};
