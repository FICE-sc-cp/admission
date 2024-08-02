import { DocumentsApiBody } from '@/app/api/documents/documents-api.types';
import { mimeType } from '@/lib/types/documents.types';
import { User } from '../types/auth.types';

export const downloadFile = (
  resData: mimeType,
  entrantText: string,
  data: DocumentsApiBody,
  text: string
) => {
  const blob = new Blob([resData], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  const url = window.URL.createObjectURL(blob);

  const tempLink = document.createElement('a');
  tempLink.href = url;
  tempLink.setAttribute('download', `${entrantText} ${text}`);

  document.body.appendChild(tempLink);
  tempLink.click();

  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(url);
};
