export interface RegisterBody {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginBody {
  email: string;
}
