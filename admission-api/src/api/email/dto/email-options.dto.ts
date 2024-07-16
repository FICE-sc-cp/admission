class AttachmentData {
  name: string;
  contentType: string;
  buffer: Buffer;
}

export class EmailOptionsDto {
  to: string | string[];
  link?: string;
  subject: string;
  message?: string;
  attachments?: AttachmentData[];
}