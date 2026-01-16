"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLeft, Send, Phone, Video } from "lucide-react";
import anime from "animejs";
import { getConversationById, formatMessageTime, type Message } from "~/lib/mock-data";
import { cn } from "~/lib/utils";
import { Link } from "~/i18n/routing";
import { QuickActionBar } from "~/components/features/quick-action-bar";

// Chat Bubble Component
function ChatBubble({ message, isOwn }: { message: Message; isOwn: boolean }) {
  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl text-white",
          isOwn ? "rounded-br-sm" : "rounded-bl-sm"
        )}
        style={{
          background: isOwn
            ? "rgba(233, 30, 99, 0.8)"  // Pink for sent messages
            : "rgba(255, 255, 255, 0.1)" // Glass for received messages
        }}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <span
          className={cn(
            "text-[10px] mt-1 block",
            isOwn ? "text-white/70 text-right" : "text-white/50"
          )}
        >
          {formatMessageTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

interface ChatConversationContentProps {
  conversationId: string;
}

export function ChatConversationContent({ conversationId }: ChatConversationContentProps) {
  const t = useTranslations("chat");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const conversation = getConversationById(conversationId);

  // Initialize messages
  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversation]);

  // Page enter animation
  useEffect(() => {
    if (pageRef.current) {
      anime({
        targets: pageRef.current,
        opacity: [0, 1],
        translateX: [20, 0],
        duration: 300,
        easing: "easeOutCubic",
      });
    }
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate reply after 1-2 seconds
    setTimeout(() => {
      const replies = [
        "That sounds great! 😊",
        "I'm down for that!",
        "Haha yes exactly!",
        "Let's do it! 🍃",
        "Can't wait!",
      ];
      const replyMessage: Message = {
        id: `msg-${Date.now()}-reply`,
        senderId: conversation?.profile.id || "other",
        text: replies[Math.floor(Math.random() * replies.length)]!,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (message: string) => {
    setInputValue(message);
    inputRef.current?.focus();
  };

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-text-secondary">Conversation not found</p>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="opacity-0 flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 glass border-b border-white/[0.08] safe-top">
        <Link href="/chat" className="icon-btn w-10 h-10">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <Link href={`/profile/${conversation.profile.id}`} className="flex items-center gap-3 flex-1">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={conversation.profile.photo}
              alt={conversation.profile.name}
              fill
              className="object-cover"
              sizes="40px"
            />
            {conversation.profile.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-light rounded-full border-2 border-lounge-charcoal" />
            )}
          </div>

          <div className="flex-1">
            <h2 className="font-display text-lg font-medium text-text-primary">
              {conversation.profile.name}
            </h2>
            <span className="text-xs text-text-muted">
              {conversation.profile.online ? t("online") : "Offline"}
            </span>
          </div>
        </Link>

        <button className="icon-btn w-10 h-10">
          <Phone className="w-5 h-5" />
        </button>
        <button className="icon-btn w-10 h-10">
          <Video className="w-5 h-5" />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} isOwn={message.senderId === "me"} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Bar */}
      <QuickActionBar onSelect={handleQuickAction} />

      {/* Input */}
      <div className="px-4 py-3 glass border-t border-white/[0.08] safe-bottom">
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={t("typeMessage")}
            className="input-field flex-1"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center bg-rose text-white transition-all duration-200",
              !inputValue.trim() && "opacity-50 cursor-not-allowed"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
