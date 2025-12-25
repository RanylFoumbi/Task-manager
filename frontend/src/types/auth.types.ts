export interface User {
  id: string;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  password: string;
  confirm_password: string;
  accept_terms: boolean;
}

export interface ResetPasswordData {
  email: string;
}

export interface ResetPasswordConfirmData {
  token: string;
  password: string;
  confirm_password: string;
}

export interface AuthResponse {
  code: string;
  success: boolean;
  message: string;
  data?: {
    user: User;
    access?: string;
    refresh?: string;
  };
}

export interface AuthError {
  message: string;
  field?: string;
}
