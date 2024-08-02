import {
  DocumentsApiBody,
  DownloadDocument,
} from '@/app/api/documents/documents-api.types';
import { instance } from '@/app/api/instance';
import { mimeType } from '@/lib/types/documents.types';

class DocumentsApi {
  async createDocument(
    body: Omit<DocumentsApiBody, 'id' | 'state' | 'number' | 'date'>
  ) {
    return await instance.post<DocumentsApiBody>('/documents', body);
  }

  async updateDocument(body: DocumentsApiBody, contractId: string) {
    return await instance.patch<DocumentsApiBody>(
      `/documents/${contractId}`,
      body
    );
  }

  async deleteDocument(contractId: string) {
    return await instance.delete<DocumentsApiBody>(`documents/${contractId}`);
  }

  async downloadContract(contractId: string) {
    return instance.get<mimeType>(
      `/documents/${contractId}/download/contract`,
      {
        responseType: 'blob',
      }
    );
  }

  async downloadPayment(contractId: string) {
    return instance.get<mimeType>(`/documents/${contractId}/download/payment`, {
      responseType: 'blob',
    });
  }

  async downloadPriority(contractId: string) {
    return instance.get<mimeType>(
      `/documents/${contractId}/download/priority`,
      {
        responseType: 'blob',
      }
    );
  }
}

export default new DocumentsApi();
