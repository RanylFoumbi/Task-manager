import { authAPI } from "@/api/auth.api";
import { useAuthStore } from "@/store/authStore";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setAuth, logout } = useAuthStore();

  const loginMutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: authAPI.login,
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user, data.access, data.refresh);
      navigate("/dashboard");
    },
  });

  const registerMutation = useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: authAPI.register,
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user, data.access, data.refresh);
      navigate("/dashboard");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      logout();
      navigate("/login");
    },
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error,
  };
};
