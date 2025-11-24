import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
} from "react";
import { X } from "lucide-react";

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div
        ref={dialogRef}
        className="relative z-50 w-full max-w-lg bg-card border border-border rounded-lg shadow-lg"
      >
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const DialogHeader = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
      {...props}
    />
  );
};

export const DialogTitle = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      className={`text-lg font-semibold text-foreground ${className}`}
      {...props}
    />
  );
};

export const DialogDescription = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props} />
  );
};

export const DialogFooter = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
      {...props}
    />
  );
};

interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClose: () => void;
}

export const DialogClose = ({
  onClose,
  className = "",
  ...props
}: DialogCloseProps) => {
  return (
    <button
      onClick={onClose}
      className={`absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none ${className}`}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  );
};
