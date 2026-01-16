"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  Search,
  Users,
  UserPlus,
  MessageCircle,
  Video,
  Leaf,
  BadgeCheck,
  Filter,
  Bell,
} from "lucide-react";
import anime from "animejs";
import { Link, useRouter } from "~/i18n/routing";
import { mockProfiles } from "~/lib/mock-data";

// Types
interface Friend {
  id: string;
  name: string;
  photo: string;
  verified: boolean;
  isOnline: boolean;
  lastActive?: string;
  friendsSince: string;
  origin: "vibe_mutual" | "sesh_met" | "matched" | "added";
  mutualFriends: number;
}

// Mock friends data
const mockFriends: Friend[] = mockProfiles.map((p, i) => ({
  id: p.id,
  name: p.name,
  photo: p.photo,
  verified: p.verified,
  isOnline: i < 4,
  lastActive: i >= 4 ? (i < 7 ? "2h ago" : "Yesterday") : undefined,
  friendsSince: "Dec 2025",
  origin: (["vibe_mutual", "sesh_met", "matched", "added"] as const)[i % 4],
  mutualFriends: Math.floor(Math.random() * 8) + 1,
}));

// Origin labels
const originLabels: Record<Friend["origin"], { label: string; icon: React.ElementType }> = {
  vibe_mutual: { label: "Mutual Vibe", icon: Video },
  sesh_met: { label: "Met at Sesh", icon: Leaf },
  matched: { label: "Matched", icon: Users },
  added: { label: "Added", icon: UserPlus },
};

// Friend Card Component
function FriendCard({ friend }: { friend: Friend }) {
  const OriginIcon = originLabels[friend.origin].icon;

  return (
    <Link
      href={`/profile/me/friends/${friend.id}`}
      className="flex items-center gap-3 p-4 rounded-2xl transition-all active:scale-[0.98]"
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
    >
      {/* Avatar with online status */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/10">
          <Image
            src={friend.photo}
            alt={friend.name}
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        {friend.isOnline && (
          <span
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 animate-pulse"
            style={{ backgroundColor: "#22c55e", borderColor: "var(--color-black)" }}
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-white truncate">{friend.name}</span>
          {friend.verified && (
            <BadgeCheck className="w-4 h-4 flex-shrink-0" style={{ color: "#D4AF37" }} />
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          {friend.isOnline ? (
            <span className="text-green-400">Online</span>
          ) : (
            <span className="text-white/40">{friend.lastActive}</span>
          )}
          <span className="text-white/20">-</span>
          <span className="text-white/40 flex items-center gap-1">
            <OriginIcon className="w-3 h-3" />
            {originLabels[friend.origin].label}
          </span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
          style={{ background: "rgba(255, 255, 255, 0.05)" }}
        >
          <MessageCircle className="w-5 h-5 text-white/50" />
        </button>
      </div>
    </Link>
  );
}

// Filter types
type FilterType = "all" | "online" | "vibe_mutual" | "sesh_met";

export function FriendsListContent() {
  const t = useTranslations("profile");
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  // Entrance animation
  useEffect(() => {
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(30, { start: 100 }),
        duration: 400,
        easing: "easeOutCubic",
      });
    }
  }, []);

  // Filter friends
  const filteredFriends = mockFriends.filter((friend) => {
    const matchesSearch = friend.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "online" && friend.isOnline) ||
      (filter === "vibe_mutual" && friend.origin === "vibe_mutual") ||
      (filter === "sesh_met" && friend.origin === "sesh_met");
    return matchesSearch && matchesFilter;
  });

  const onlineCount = mockFriends.filter((f) => f.isOnline).length;
  const pendingRequests = 3; // Mock count

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div
        className="px-4 pt-4 pb-4 safe-top"
        style={{
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
          >
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>
          <h1 className="font-display text-lg text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-green-400" />
            Friends ({mockFriends.length})
          </h1>
          <Link
            href="/profile/me/friends/requests"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10 relative"
          >
            <Bell className="w-5 h-5 text-white/60" />
            {pendingRequests > 0 && (
              <span
                className="absolute top-1 right-1 w-5 h-5 rounded-full text-[10px] flex items-center justify-center text-white"
                style={{ background: "var(--color-accent-1)" }}
              >
                {pendingRequests}
              </span>
            )}
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search friends..."
            className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {[
            { key: "all", label: "All" },
            { key: "online", label: `Online (${onlineCount})` },
            { key: "vibe_mutual", label: "Vibe Friends" },
            { key: "sesh_met", label: "Sesh Friends" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as FilterType)}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
              style={{
                background:
                  filter === f.key
                    ? "rgba(74, 222, 128, 0.2)"
                    : "rgba(255, 255, 255, 0.05)",
                color: filter === f.key ? "#4ade80" : "rgba(255, 255, 255, 0.5)",
                border: `1px solid ${filter === f.key ? "#4ade80" : "rgba(255, 255, 255, 0.1)"}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
        {filteredFriends.map((friend) => (
          <div key={friend.id} className="opacity-0">
            <FriendCard friend={friend} />
          </div>
        ))}

        {/* Empty state */}
        {filteredFriends.length === 0 && (
          <div className="text-center py-12 opacity-0">
            <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-white/60 font-medium mb-2">No friends found</h3>
            <p className="text-white/40 text-sm">
              {searchQuery ? "Try a different search" : "Start connecting with people!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
