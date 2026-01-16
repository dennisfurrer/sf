"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  timestamp: Date | string;
  variant: "sent" | "received";
}

const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, message, timestamp, variant, ...props }, ref) => {
    const time =
      typeof timestamp === "string"
        ? timestamp
        : timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col max-w-[75%]",
          variant === "sent" ? "items-end self-end" : "items-start self-start",
          className
        )}
        {...props}
      >
        {/* Message bubble */}
        <div
          className={cn(
            "px-4 py-3 rounded-2xl",
            variant === "sent"
              ? "bg-velvet-rose text-white rounded-br-md"
              : "glass text-cream rounded-bl-md"
          )}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>

        {/* Timestamp */}
        <span className="text-[10px] mt-1 px-1 text-cream/40">
          {time}
        </span>
      </div>
    );
  }
);

ChatBubble.displayName = "ChatBubble";

export { ChatBubble };
