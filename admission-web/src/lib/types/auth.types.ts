export interface User {
  id: string;
  email: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  role: string;
}

export interface Session {
  user: User | null;
  loading: boolean;
}
