import { DocumentsApiBody } from '@/app/api/documents/documents-api.types';
import { instance } from '@/app/api/instance';

class DocumentsApi {
  async createDocument(body: DocumentsApiBody) {
    await instance.post('/documents', body);
  }
}

export default new DocumentsApi();
