"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "~/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles = "font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: cn(
        "bg-gradient-to-br from-velvet-rose to-velvet-wine",
        "text-white shadow-[0_0_40px_rgba(139,77,98,0.5)]",
        "rounded-2xl",
        "hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(139,77,98,0.6)]"
      ),
      secondary: cn(
        "glass text-cream rounded-2xl hover:bg-white/[0.06]"
      ),
    };
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
