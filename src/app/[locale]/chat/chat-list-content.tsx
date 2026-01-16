"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import anime from "animejs";
import { mockConversations, formatMessageTime, type Conversation } from "~/lib/mock-data";
import { cn } from "~/lib/utils";
import { Link } from "~/i18n/routing";

// Conversation Card Component
function ConversationCard({
  conversation,
  isActive,
}: {
  conversation: Conversation;
  isActive: boolean;
}) {
  const t = useTranslations("chat");

  return (
    <Link
      href={`/chat/${conversation.id}`}
      className={cn(
        "flex flex-col h-full bg-lounge-smoke rounded-3xl overflow-hidden transition-all duration-300",
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"
      )}
    >
      {/* Profile Image */}
      <div className="relative h-48 flex-shrink-0">
        <Image
          src={conversation.profile.photo}
          alt={conversation.profile.name}
          fill
          className="object-cover"
          sizes="300px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lounge-smoke via-transparent to-transparent" />

        {/* Online indicator */}
        {conversation.profile.online && (
          <div className="absolute top-4 right-4">
            <span className="badge-online text-xs">{t("online")}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-xl font-medium text-text-primary">
            {conversation.profile.name}
          </h3>
          <span className="text-text-muted text-xs">
            {formatMessageTime(conversation.lastMessageTime)}
          </span>
        </div>

        <p className="text-text-secondary text-sm line-clamp-2 flex-1">
          {conversation.lastMessage}
        </p>

        {/* Unread badge */}
        {conversation.unread > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <span className="px-2 py-1 bg-rose rounded-full text-white text-xs font-medium">
              {conversation.unread} new
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

// Swipeable Chat List
export function ChatListContent() {
  const t = useTranslations("chat");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);

  // Page enter animation
  useEffect(() => {
    if (pageRef.current) {
      anime({
        targets: pageRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 400,
        easing: "easeOutCubic",
      });
    }
  }, []);

  const conversations = mockConversations;
  const cardWidth = 280;
  const gap = 16;

  const animateToIndex = useCallback(
    (index: number) => {
      if (!containerRef.current) return;

      const targetX = -index * (cardWidth + gap);

      anime({
        targets: containerRef.current,
        translateX: targetX,
        duration: 300,
        easing: "easeOutCubic",
      });

      setCurrentIndex(index);
      setDragDelta(0);
    },
    [cardWidth, gap]
  );

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0]!.clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !containerRef.current) return;

      const clientX = "touches" in e ? e.touches[0]!.clientX : e.clientX;
      const delta = clientX - dragStart;
      setDragDelta(delta);

      const currentX = -currentIndex * (cardWidth + gap);
      containerRef.current.style.transform = `translateX(${currentX + delta}px)`;
    },
    [isDragging, dragStart, currentIndex, cardWidth, gap]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 80;

    if (dragDelta > threshold && currentIndex > 0) {
      animateToIndex(currentIndex - 1);
    } else if (dragDelta < -threshold && currentIndex < conversations.length - 1) {
      animateToIndex(currentIndex + 1);
    } else {
      animateToIndex(currentIndex);
    }
  }, [isDragging, dragDelta, currentIndex, conversations.length, animateToIndex]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDragMove);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const goToPrev = () => {
    if (currentIndex > 0) {
      animateToIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < conversations.length - 1) {
      animateToIndex(currentIndex + 1);
    }
  };

  return (
    <div ref={pageRef} className="opacity-0 flex flex-col h-full">
      {/* Header */}
      <header className="px-4 pt-4 pb-2 safe-top">
        <h1 className="font-display text-2xl font-medium text-text-primary text-center">
          {t("title")}
        </h1>
      </header>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 py-4">
        {conversations.map((_, index) => (
          <button
            key={index}
            onClick={() => animateToIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex ? "bg-gold w-6" : "bg-text-muted/30"
            )}
          />
        ))}
      </div>

      {/* Swipeable conversations container */}
      <div className="flex-1 relative overflow-hidden px-4">
        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-20 icon-btn",
            currentIndex === 0 && "opacity-30 cursor-not-allowed"
          )}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goToNext}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-20 icon-btn",
            currentIndex === conversations.length - 1 && "opacity-30 cursor-not-allowed"
          )}
          disabled={currentIndex === conversations.length - 1}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Cards container */}
        <div
          className="flex items-center justify-center h-full"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div
            ref={containerRef}
            className="flex gap-4 cursor-grab active:cursor-grabbing"
            style={{ transform: `translateX(0)` }}
          >
            {conversations.map((conversation, index) => (
              <div
                key={conversation.id}
                className="flex-shrink-0"
                style={{ width: cardWidth, height: 380 }}
              >
                <ConversationCard
                  conversation={conversation}
                  isActive={index === currentIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Swipe hint */}
      <div className="text-center py-4">
        <p className="text-text-muted text-sm">Swipe to switch conversations</p>
      </div>
    </div>
  );
}
