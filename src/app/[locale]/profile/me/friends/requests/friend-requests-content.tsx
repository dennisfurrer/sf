"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  UserPlus,
  Check,
  X,
  Clock,
  Users,
  Leaf,
  Video,
} from "lucide-react";
import anime from "animejs";
import { useRouter } from "~/i18n/routing";
import { mockProfiles } from "~/lib/mock-data";

// Types
interface FriendRequest {
  id: string;
  user: {
    id: string;
    name: string;
    photo: string;
    verified: boolean;
  };
  mutualFriends: number;
  source: "sesh" | "vibe" | "search" | "suggested";
  timestamp: string;
}

// Mock incoming requests
const mockIncoming: FriendRequest[] = [
  {
    id: "r1",
    user: mockProfiles[5]!,
    mutualFriends: 3,
    source: "sesh",
    timestamp: "2h ago",
  },
  {
    id: "r2",
    user: mockProfiles[6]!,
    mutualFriends: 1,
    source: "vibe",
    timestamp: "Yesterday",
  },
  {
    id: "r3",
    user: mockProfiles[7]!,
    mutualFriends: 5,
    source: "suggested",
    timestamp: "2 days ago",
  },
];

// Mock outgoing requests
const mockOutgoing: FriendRequest[] = [
  {
    id: "o1",
    user: mockProfiles[3]!,
    mutualFriends: 2,
    source: "search",
    timestamp: "1h ago",
  },
  {
    id: "o2",
    user: mockProfiles[4]!,
    mutualFriends: 0,
    source: "sesh",
    timestamp: "3 days ago",
  },
];

// Source config
const sourceConfig = {
  sesh: { label: "From Sesh", icon: Leaf, color: "#4ade80" },
  vibe: { label: "From Vibe", icon: Video, color: "#c084fc" },
  search: { label: "You found them", icon: Users, color: "#60a5fa" },
  suggested: { label: "Suggested", icon: UserPlus, color: "#fb923c" },
};

// Request Card Component
function RequestCard({
  request,
  type,
  onAccept,
  onDecline,
  onCancel,
}: {
  request: FriendRequest;
  type: "incoming" | "outgoing";
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onCancel?: (id: string) => void;
}) {
  const source = sourceConfig[request.source];
  const SourceIcon = source.icon;

  return (
    <div
      className="p-4 rounded-2xl"
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/10">
          <Image
            src={request.user.photo}
            alt={request.user.name}
            width={56}
            height={56}
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-display text-white truncate">
              {request.user.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <SourceIcon className="w-3 h-3" style={{ color: source.color }} />
            <span style={{ color: source.color }}>{source.label}</span>
            {request.mutualFriends > 0 && (
              <>
                <span className="text-white/20">-</span>
                <span className="text-white/40">
                  {request.mutualFriends} mutual
                </span>
              </>
            )}
          </div>
          <div className="text-white/30 text-xs mt-1">{request.timestamp}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        {type === "incoming" ? (
          <>
            <button
              onClick={() => onAccept?.(request.id)}
              className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
              }}
            >
              <Check className="w-5 h-5" />
              Accept
            </button>
            <button
              onClick={() => onDecline?.(request.id)}
              className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <X className="w-5 h-5" />
              Decline
            </button>
          </>
        ) : (
          <button
            onClick={() => onCancel?.(request.id)}
            className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            }}
          >
            <X className="w-5 h-5" />
            Cancel Request
          </button>
        )}
      </div>
    </div>
  );
}

// Tab types
type TabType = "incoming" | "outgoing";

export function FriendRequestsContent() {
  const t = useTranslations("profile");
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>("incoming");
  const [incoming, setIncoming] = useState(mockIncoming);
  const [outgoing, setOutgoing] = useState(mockOutgoing);

  // Entrance animation
  useEffect(() => {
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(50, { start: 100 }),
        duration: 400,
        easing: "easeOutCubic",
      });
    }
  }, [activeTab]);

  const handleAccept = (id: string) => {
    setIncoming((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDecline = (id: string) => {
    setIncoming((prev) => prev.filter((r) => r.id !== id));
  };

  const handleCancel = (id: string) => {
    setOutgoing((prev) => prev.filter((r) => r.id !== id));
  };

  const requests = activeTab === "incoming" ? incoming : outgoing;

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
            <UserPlus className="w-5 h-5 text-green-400" />
            Friend Requests
          </h1>
          <div className="w-10" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("incoming")}
            className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
            style={{
              background:
                activeTab === "incoming"
                  ? "rgba(74, 222, 128, 0.2)"
                  : "rgba(255, 255, 255, 0.05)",
              color: activeTab === "incoming" ? "#4ade80" : "rgba(255, 255, 255, 0.5)",
              border: `1px solid ${activeTab === "incoming" ? "#4ade80" : "rgba(255, 255, 255, 0.1)"}`,
            }}
          >
            Incoming
            {incoming.length > 0 && (
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  background:
                    activeTab === "incoming"
                      ? "rgba(74, 222, 128, 0.3)"
                      : "rgba(255, 255, 255, 0.1)",
                }}
              >
                {incoming.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("outgoing")}
            className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
            style={{
              background:
                activeTab === "outgoing"
                  ? "rgba(96, 165, 250, 0.2)"
                  : "rgba(255, 255, 255, 0.05)",
              color: activeTab === "outgoing" ? "#60a5fa" : "rgba(255, 255, 255, 0.5)",
              border: `1px solid ${activeTab === "outgoing" ? "#60a5fa" : "rgba(255, 255, 255, 0.1)"}`,
            }}
          >
            <Clock className="w-4 h-4" />
            Pending
            {outgoing.length > 0 && (
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  background:
                    activeTab === "outgoing"
                      ? "rgba(96, 165, 250, 0.3)"
                      : "rgba(255, 255, 255, 0.1)",
                }}
              >
                {outgoing.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
        {requests.map((request) => (
          <div key={request.id} className="opacity-0">
            <RequestCard
              request={request}
              type={activeTab}
              onAccept={handleAccept}
              onDecline={handleDecline}
              onCancel={handleCancel}
            />
          </div>
        ))}

        {/* Empty state */}
        {requests.length === 0 && (
          <div className="text-center py-12 opacity-0">
            <UserPlus className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-white/60 font-medium mb-2">
              {activeTab === "incoming" ? "No pending requests" : "No sent requests"}
            </h3>
            <p className="text-white/40 text-sm">
              {activeTab === "incoming"
                ? "New friend requests will appear here"
                : "People you've sent requests to will appear here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
