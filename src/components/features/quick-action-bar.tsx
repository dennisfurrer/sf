"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { cn } from "~/lib/utils";

const quickActions = [
  { emoji: "\u{1F343}", labelKey: "smoke" },     // Leaf fluttering
  { emoji: "\u{1F60C}", labelKey: "chill" },     // Relieved face
  { emoji: "\u{1F4F9}", labelKey: "video" },     // Video camera
  { emoji: "\u{1F3E0}", labelKey: "hangout" },   // House
  { emoji: "\u{2728}", labelKey: "vibing" },     // Sparkles
  { emoji: "\u{1F6AC}", labelKey: "joint" },     // Cigarette
] as const;

export interface QuickActionBarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect: (message: string) => void;
}

const QuickActionBar = forwardRef<HTMLDivElement, QuickActionBarProps>(
  ({ className, onSelect, ...props }, ref) => {
    const t = useTranslations("chat.quickActions");

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2 overflow-x-auto py-3 px-4",
          "border-t border-white/[0.08]",
          "scrollbar-hide",
          className
        )}
        style={{
          background: "rgba(255, 255, 255, 0.02)",
        }}
        {...props}
      >
        {quickActions.map(({ emoji, labelKey }) => (
          <button
            key={labelKey}
            onClick={() => onSelect(t(labelKey))}
            className="quick-chip flex items-center gap-1.5 shrink-0"
          >
            <span className="text-base">{emoji}</span>
            <span>{t(labelKey)}</span>
          </button>
        ))}
      </div>
    );
  }
);

QuickActionBar.displayName = "QuickActionBar";

export { QuickActionBar };
