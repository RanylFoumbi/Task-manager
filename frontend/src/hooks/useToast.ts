import { useToastStore } from "@/store/toastStore";
import type { ToastVariant } from "@/store/toastStore";

export const useToast = () => {
  const { addToast, removeToast } = useToastStore();

  const toast = (
    description: string,
    variant: ToastVariant = "default",
    duration = 5000
  ) => {
    addToast({
      description,
      variant,
      duration,
    });
  };

  const success = (description: string, duration = 5000) => {
    toast(description, "success", duration);
  };

  const error = (description: string, duration = 5000) => {
    toast(description, "error", duration);
  };

  const warning = (description: string, duration = 5000) => {
    toast(description, "warning", duration);
  };

  const info = (description: string, duration = 5000) => {
    toast(description, "info", duration);
  };

  return {
    toast,
    success,
    error,
    warning,
    info,
    remove: removeToast,
  };
};

