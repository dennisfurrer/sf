"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  online?: boolean;
  storyRing?: boolean;
  viewed?: boolean;
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-20 h-20",
};

const onlineIndicatorSizes = {
  sm: "w-2.5 h-2.5 border",
  md: "w-3 h-3 border-2",
  lg: "w-4 h-4 border-2",
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = "md", online, storyRing, viewed, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex-shrink-0",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {/* Story ring gradient border */}
        {storyRing && (
          <div
            className={cn(
              "absolute inset-0 rounded-full p-[2px]",
              viewed
                ? "bg-white/20"
                : "bg-gradient-to-tr from-green via-gold to-velvet-rose"
            )}
          >
            <div className="w-full h-full rounded-full bg-velvet-black" />
          </div>
        )}

        {/* Avatar image */}
        <img
          src={src}
          alt={alt}
          className={cn(
            "absolute rounded-full object-cover",
            storyRing ? "inset-[3px]" : "inset-0 w-full h-full"
          )}
          style={storyRing ? { width: "calc(100% - 6px)", height: "calc(100% - 6px)" } : undefined}
        />

        {/* Online indicator */}
        {online && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full bg-[#6fcf97] border-velvet-black",
              "animate-pulse",
              onlineIndicatorSizes[size]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
