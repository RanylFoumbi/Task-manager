import { type HTMLAttributes, forwardRef } from "react";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "error" | "warning" | "info";
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert({ className = "", variant = "default", children, ...props }, ref) {
    const variants = {
      default: "bg-muted text-foreground border-border",
      success: "bg-success/10 text-success border-success/20",
      error: "bg-error/10 text-error border-error/20",
      warning: "bg-warning/10 text-warning border-warning/20",
      info: "bg-info/10 text-info border-info/20",
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
        ref={ref}
        className={`relative w-full rounded-lg border p-4 ${variants[variant]} ${className}`}
        {...props}
      >
        <div className="flex gap-3">
          {icons[variant] && <div className="shrink-0">{icons[variant]}</div>}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    );
  },
);

export const AlertTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function AlertTitle({ className = "", ...props }, ref) {
  return (
    <h5
      ref={ref}
      className={`mb-1 font-medium leading-none tracking-tight ${className}`}
      {...props}
    />
  );
});

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function AlertDescription({ className = "", ...props }, ref) {
  return (
    <div ref={ref} className={`text-sm opacity-90 ${className}`} {...props} />
  );
});
