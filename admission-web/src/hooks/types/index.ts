import { User } from '@/lib/schemas-and-types/auth';

export interface Session {
  user: User | null;
  loading: boolean;
}
