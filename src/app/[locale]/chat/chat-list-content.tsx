"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Video,
  Leaf,
  Users,
  Heart,
  BadgeCheck,
} from "lucide-react";
import anime from "animejs";
import {
  mockConversations,
  formatMessageTime,
  type Conversation,
  type ConversationType,
} from "~/lib/mock-data";
import { cn } from "~/lib/utils";
import { Link } from "~/i18n/routing";

// Tab config
const tabConfig: Record<
  "all" | ConversationType,
  { label: string; icon: React.ElementType; color: string }
> = {
  all: { label: "All", icon: MessageCircle, color: "#4ade80" },
  match: { label: "Matches", icon: Heart, color: "#f472b6" },
  vibe: { label: "Vibes", icon: Video, color: "#c084fc" },
  sesh: { label: "Sesh", icon: Leaf, color: "#4ade80" },
  friend: { label: "Friends", icon: Users, color: "#60a5fa" },
};

// Filter Tab Component
function FilterTab({
  type,
  active,
  count,
  onClick,
}: {
  type: "all" | ConversationType;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  const config = tabConfig[type];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all"
      style={{
        background: active ? `${config.color}20` : "rgba(255, 255, 255, 0.05)",
        color: active ? config.color : "rgba(255, 255, 255, 0.5)",
        border: `1px solid ${active ? config.color : "rgba(255, 255, 255, 0.1)"}`,
      }}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{config.label}</span>
      {count > 0 && (
        <span
          className="px-1.5 py-0.5 rounded-full text-xs"
          style={{
            background: active ? `${config.color}30` : "rgba(255, 255, 255, 0.1)",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// Conversation Card Component
function ConversationCard({
  conversation,
  isActive,
}: {
  conversation: Conversation;
  isActive: boolean;
}) {
  const t = useTranslations("chat");
  const typeConfig = tabConfig[conversation.type];

  return (
    <Link
      href={`/chat/${conversation.id}`}
      className={cn(
        "flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-300",
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"
      )}
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10, 10, 10, 1) 0%, transparent 60%)",
          }}
        />

        {/* Type badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full flex items-center gap-1.5"
          style={{ background: `${typeConfig.color}20`, color: typeConfig.color }}
        >
          <typeConfig.icon className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{typeConfig.label}</span>
        </div>

        {/* Online indicator */}
        {conversation.profile.online && (
          <div className="absolute top-4 right-4">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: "rgba(34, 197, 94, 0.2)", color: "#4ade80" }}
            >
              {t("online")}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <h3 className="font-display text-xl font-medium text-white">
              {conversation.profile.name}
            </h3>
            {conversation.profile.verified && (
              <BadgeCheck className="w-5 h-5" style={{ color: "#D4AF37" }} />
            )}
          </div>
          <span className="text-white/40 text-xs">
            {formatMessageTime(conversation.lastMessageTime)}
          </span>
        </div>

        <p className="text-white/50 text-sm line-clamp-2 flex-1">
          {conversation.lastMessage}
        </p>

        {/* Unread badge */}
        {conversation.unread > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-full text-white text-xs font-medium"
              style={{ background: "var(--color-accent-1)" }}
            >
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
  const [activeFilter, setActiveFilter] = useState<"all" | ConversationType>("all");
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

  // Filter conversations
  const conversations =
    activeFilter === "all"
      ? mockConversations
      : mockConversations.filter((c) => c.type === activeFilter);

  // Count by type
  const countByType = (type: ConversationType) =>
    mockConversations.filter((c) => c.type === type).length;

  const cardWidth = 280;
  const gap = 16;

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    if (containerRef.current) {
      containerRef.current.style.transform = "translateX(0)";
    }
  }, [activeFilter]);

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

  // Calculate total unread
  const totalUnread = mockConversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div ref={pageRef} className="opacity-0 flex flex-col h-full">
      {/* Header */}
      <header
        className="px-4 pt-4 pb-4 safe-top"
        style={{
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl text-white flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-400" />
            {t("title")}
          </h1>
          {totalUnread > 0 && (
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ background: "var(--color-accent-1)" }}
            >
              {totalUnread} unread
            </span>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
          <FilterTab
            type="all"
            active={activeFilter === "all"}
            count={mockConversations.length}
            onClick={() => setActiveFilter("all")}
          />
          <FilterTab
            type="match"
            active={activeFilter === "match"}
            count={countByType("match")}
            onClick={() => setActiveFilter("match")}
          />
          <FilterTab
            type="vibe"
            active={activeFilter === "vibe"}
            count={countByType("vibe")}
            onClick={() => setActiveFilter("vibe")}
          />
          <FilterTab
            type="sesh"
            active={activeFilter === "sesh"}
            count={countByType("sesh")}
            onClick={() => setActiveFilter("sesh")}
          />
          <FilterTab
            type="friend"
            active={activeFilter === "friend"}
            count={countByType("friend")}
            onClick={() => setActiveFilter("friend")}
          />
        </div>
      </header>

      {/* Dot indicators */}
      {conversations.length > 0 && (
        <div className="flex justify-center gap-2 py-4">
          {conversations.map((_, index) => (
            <button
              key={index}
              onClick={() => animateToIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-green-400 w-6" : "bg-white/20"
              )}
            />
          ))}
        </div>
      )}

      {/* Swipeable conversations container */}
      <div className="flex-1 relative overflow-hidden px-4">
        {conversations.length > 0 ? (
          <>
            {/* Navigation arrows */}
            <button
              onClick={goToPrev}
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all",
                currentIndex === 0 && "opacity-30 cursor-not-allowed"
              )}
              style={{ background: "rgba(255, 255, 255, 0.1)" }}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={goToNext}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all",
                currentIndex === conversations.length - 1 &&
                  "opacity-30 cursor-not-allowed"
              )}
              style={{ background: "rgba(255, 255, 255, 0.1)" }}
              disabled={currentIndex === conversations.length - 1}
            >
              <ChevronRight className="w-5 h-5 text-white" />
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
                style={{ transform: "translateX(0)" }}
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
          </>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full">
            <MessageCircle className="w-16 h-16 text-white/20 mb-4" />
            <h3 className="text-white/60 font-medium mb-2">No conversations</h3>
            <p className="text-white/40 text-sm text-center">
              Start matching, vibing, or joining seshes to start chatting!
            </p>
          </div>
        )}
      </div>

      {/* Swipe hint */}
      {conversations.length > 1 && (
        <div className="text-center py-4">
          <p className="text-white/40 text-sm">Swipe to switch conversations</p>
        </div>
      )}
    </div>
  );
}
