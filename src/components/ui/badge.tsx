"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { CheckCircle } from "lucide-react";
import { cn } from "~/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: "verified" | "online" | "cannabis" | "live";
  children?: ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    const baseStyles = cn(
      "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg",
      "bg-black/50 backdrop-blur"
    );

    const variants = {
      verified: "text-gold border border-gold/30",
      online: "text-[#6fcf97]",
      cannabis: "text-green-light border border-green/30",
      live: "text-red-500 border border-red-500/30",
    };

    const icons = {
      verified: <CheckCircle className="w-3 h-3" />,
      online: <span className="w-1.5 h-1.5 bg-[#6fcf97] rounded-full animate-pulse" />,
      cannabis: null,
      live: <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />,
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {icons[variant]}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
