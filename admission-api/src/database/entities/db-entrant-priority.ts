import { DocumentState, Priority } from '@prisma/client';

export class DbEntrantPriority {
  id: string;
  userId: string;
  state: DocumentState;
  date: string;
  specialty: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  priorities: Priority[];
}