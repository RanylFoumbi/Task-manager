import { createBrowserRouter } from "react-router";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import MailConfirmationPage from "./pages/auth/MailConfirmationPage";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
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
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
