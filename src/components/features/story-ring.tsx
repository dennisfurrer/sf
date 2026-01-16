"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export interface StoryRingProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  viewed?: boolean;
  name?: string;
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-20 h-20",
  lg: "w-24 h-24",
};

const StoryRing = forwardRef<HTMLDivElement, StoryRingProps>(
  ({ className, src, alt, size = "md", viewed = false, name, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center gap-1.5", className)}
        {...props}
      >
        {/* Story ring container */}
        <div
          className={cn(
            "relative rounded-full p-[3px]",
            viewed
              ? "bg-white/20"
              : "bg-gradient-to-tr from-green via-gold to-velvet-rose",
            sizeClasses[size]
          )}
        >
          {/* Inner black ring */}
          <div className="w-full h-full rounded-full bg-velvet-black p-[2px]">
            {/* Avatar image */}
            <img
              src={src}
              alt={alt}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Name label */}
        {name && (
          <span
            className={cn(
              "text-xs font-medium truncate max-w-[5rem]",
              viewed ? "text-cream/50" : "text-cream"
            )}
          >
            {name}
          </span>
        )}
      </div>
    );
  }
);

StoryRing.displayName = "StoryRing";

export { StoryRing };
