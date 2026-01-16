"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export interface WarStoryCardProps extends HTMLAttributes<HTMLDivElement> {
  prompt: string;
  answer: string;
}

const WarStoryCard = forwardRef<HTMLDivElement, WarStoryCardProps>(
  ({ className, prompt, answer, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("glass rounded-2xl p-4", className)}
        {...props}
      >
        {/* Prompt text in gold */}
        <p className="text-sm text-gold mb-2 font-medium">{prompt}</p>
        {/* Answer in primary text */}
        <p className="text-cream leading-relaxed">{answer}</p>
      </div>
    );
  }
);

WarStoryCard.displayName = "WarStoryCard";

export { WarStoryCard };
