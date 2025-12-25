import { createBrowserRouter, type RouteObject } from "react-router";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import MailConfirmationPage from "./pages/auth/MailConfirmationPage";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import App from "./App";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const publicRoutes: RouteObject[] = [
  {
    path: "login",
    Component: LoginPage,
  },
  {
    path: "register",
    Component: RegisterPage,
  },
  {
    path: "forgot-password",
    Component: ForgotPasswordPage,
  },
  {
    path: "confirmation-sent",
    Component: MailConfirmationPage,
  },
  {
    path: "reset-password",
    Component: ResetPasswordPage,
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    Component: () => (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
];

const notFoundRoute: RouteObject = {
  path: "*",
  Component: NotFoundPage,
};

export const router = createBrowserRouter([
  ...protectedRoutes,
  ...publicRoutes,
  notFoundRoute,
]);
