export interface LoginBody {
  email: string;
}
export interface RegisterBody {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
}
