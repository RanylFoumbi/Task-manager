import api from "./axios.config";

import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "@/types/auth.types";

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post("/auth/login/", credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post("/auth/register/", data);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get("/auth/me/");
    return response.data;
  },

  logout: async (refreshToken: string | null): Promise<void> => {
    await api.post("/auth/logout/", {
      refresh: refreshToken,
    });
  },
};
