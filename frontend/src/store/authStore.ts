import type { User } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  logout: () => void;
  updateUser: (user: User) => void;
  setAuth: (
    user: User | null,
    accessToken: string | null,
    refreshToken: string | null,
  ) => void;
}

export const useAuthStore = create<
  AuthState,
  [["zustand/persist", Partial<AuthState>]]
>(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (
        user: User | null,
        accessToken: string | null,
        refreshToken: string | null,
      ) => {
        if (accessToken) {
          localStorage.setItem("access_token", accessToken);
        } else {
          localStorage.removeItem("access_token");
        }

        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken);
        } else {
          localStorage.removeItem("refresh_token");
        }

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      updateUser: (user: User) => set({ user }),
    }),
    {
      name: "auth-storage",
      partialize: (state: AuthState) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
