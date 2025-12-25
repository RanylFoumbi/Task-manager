import { type HTMLAttributes, useEffect, useState } from "react";
import { X, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "error" | "warning" | "info";
  title?: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
}

export const Toast = ({
  variant = "default",
  title,
  description,
  duration = 5000,
  onClose,
  className = "",
  ...props
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const variants = {
    default: "bg-card border-border",
    success: "bg-success/10 border-success/20 text-success",
    error: "bg-error/10 border-error/20 text-error",
    warning: "bg-warning/10 border-warning/20 text-warning",
    info: "bg-info/10 border-info/20 text-info",
  };

  const icons = {
    default: null,
    success: <CheckCircle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  return (
    <div
      className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="p-4">
        <div className="flex items-start">
          {icons[variant] && <div className="shrink-0">{icons[variant]}</div>}
          <div className={`${icons[variant] ? "ml-3" : ""} flex-1`}>
            {title && (
              <p className="text-sm font-medium text-foreground">{title}</p>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
            className="ml-4 shrink-0 rounded-md hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
