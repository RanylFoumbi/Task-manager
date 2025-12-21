import { type HTMLAttributes, forwardRef } from "react";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress({ className = "", value = 0, max = 100, ...props }, ref) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        className={`relative h-2 w-full overflow-hidden rounded-full bg-muted ${className}`}
        {...props}
      >
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  },
);
