import { Contract, CustomerData, EntrantData, QueueUser, RepresentativeData, Role, Token } from '@prisma/client';
import { DbEntrantPriority } from './db-entrant-priority';

export class DbUser {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: Role;
  benefit: boolean;
  competitivePoint: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  contracts?: Contract[];
  entrantData?: EntrantData;
  representativeData?: RepresentativeData;
  CustomerData?: CustomerData;
  entrantPriorities?: DbEntrantPriority[];
  queueUsers?: QueueUser[];
  tokens?: Token[];
}