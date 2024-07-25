export interface RegisterBody {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginBody {
  email: string;
}
