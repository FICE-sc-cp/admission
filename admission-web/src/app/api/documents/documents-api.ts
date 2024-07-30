import { DocumentsApiBody } from '@/app/api/documents/documents-api.types';
import { instance } from '@/app/api/instance';

class DocumentsApi {
  async createDocument(body: DocumentsApiBody) {
    await instance.post('/documents', body);
  }

  async updateDocument(body: DocumentsApiBody, contractId: string) {
    await instance.patch(`/documents/${contractId}`, body);
  }

  async deleteDocument(contractId: string) {
    await instance.delete(`documents/${contractId}`);
  }

  async downloadContract(contractId:string){
      return instance.get(`/documents/${contractId}/download/contract`)
  }

    async downloadPayment(contractId:string){
        return instance.get(`/documents/${contractId}/download/payment`)
    }

    async downloadPriority(contractId:string){
        return instance.get(`/documents/${contractId}/download/priority`)
    }
}

export default new DocumentsApi();
