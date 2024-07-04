export class EmailOptionsDto {
  to: string | string[];
  link?: string;
  subject: string;
  message?: string;
}