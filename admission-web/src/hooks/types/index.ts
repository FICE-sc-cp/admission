import { User } from '@/schemas-and-types/auth';

export interface Session {
  user: User | null;
  loading: boolean;
}
