import { type ImgHTMLAttributes, forwardRef, useState } from "react";
import { User } from "lucide-react";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ className = "", fallback, size = "md", src, alt, ...props }, ref) => {
    const [error, setError] = useState(false);

    const sizes = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    };

    const iconSizes = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    };

    if (error || !src) {
      return (
        <div
          className={`${sizes[size]} rounded-full bg-muted flex items-center justify-center text-muted-foreground ${className}`}
        >
          {fallback ? (
            <span className="text-sm font-medium">{fallback}</span>
          ) : (
            <User className={iconSizes[size]} />
          )}
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        onError={() => setError(true)}
        className={`${sizes[size]} rounded-full object-cover ${className}`}
        {...props}
      />
    );
  },
);
