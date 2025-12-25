import { authAPI } from "@/api/auth.api";
import { useAuthStore } from "@/store/authStore";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "./useToast";

type ApiError = AxiosError<{ message: string[] | string; code: string }>;

export const useAuth = () => {
  const navigate = useNavigate();
  const { setAuth, logout: logoutStore } = useAuthStore();
  const { success, error: showError } = useToast();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      if ("response" in error && error.response) {
        const apiError = error as ApiError;
        const message = apiError.response?.data?.message;
        if (Array.isArray(message)) {
          return message[0] || "Une erreur est survenue";
        }
        return typeof message === "string"
          ? message
          : "Une erreur est survenue";
      }
      return error.message;
    }
    return "Une erreur est survenue";
  };

  const loginMutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: authAPI.login,
    onSuccess: (data: AuthResponse) => {
      setAuth(
        data.data?.user ?? null,
        data.data?.access ?? null,
        data.data?.refresh ?? null,
      );
      success("Connexion réussie!");
      navigate("/");
    },
    onError: (error: Error) => {
      showError(getErrorMessage(error) || "Erreur de connexion");
    },
  });

  const registerMutation = useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: authAPI.register,
    onSuccess: (data: AuthResponse) => {
      if (data.success) {
        success(
          "Inscription réussie! Veuillez vérifier votre email pour la confirmation.",
        );
        navigate("/login");
      }
    },
    onError: (error: Error) => {
      showError(getErrorMessage(error) || "Erreur d'inscription");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { refreshToken } = useAuthStore.getState();
      await authAPI.logout(refreshToken);
    },
    onSuccess: () => {
      logoutStore();
      success("Déconnecté avec succès");
      navigate("/login");
    },
    onError: (error: Error) => {
      logoutStore();
      navigate("/login");
      showError(getErrorMessage(error) || "Erreur lors de la déconnexion");
    },
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading:
      loginMutation.isPending ||
      registerMutation.isPending ||
      logoutMutation.isPending,
    error: loginMutation.error || registerMutation.error,
    user: useAuthStore((state) => state.user),
    isAuthenticated: useAuthStore((state) => state.isAuthenticated),
  };
};
