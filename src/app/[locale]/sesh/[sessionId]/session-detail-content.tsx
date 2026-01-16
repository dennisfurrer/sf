"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  MapPin,
  BadgeCheck,
  Clock,
  Users,
  Leaf,
  Home,
  Navigation,
  Video,
  MessageCircle,
  Flag,
  Calendar,
} from "lucide-react";
import anime from "animejs";
import { Link, useRouter } from "~/i18n/routing";
import { getSessionById, formatSessionTiming } from "~/lib/mock-sessions";
import type { Session } from "~/lib/types";

// Strain type colors
const strainColors: Record<string, { bg: string; text: string }> = {
  sativa: { bg: "rgba(34, 197, 94, 0.2)", text: "#4ade80" },
  indica: { bg: "rgba(147, 51, 234, 0.2)", text: "#c084fc" },
  hybrid: { bg: "rgba(234, 179, 8, 0.2)", text: "#facc15" },
  edibles: { bg: "rgba(251, 146, 60, 0.2)", text: "#fb923c" },
  any: { bg: "rgba(255, 255, 255, 0.1)", text: "rgba(255, 255, 255, 0.7)" },
};

// Session type icons
const sessionTypeIcons = {
  hosting: Home,
  mobile: Navigation,
  virtual: Video,
};

const sessionTypeLabels = {
  hosting: "Hosting at their place",
  mobile: "Meeting somewhere",
  virtual: "Virtual video call",
};

// Participant Card
function ParticipantCard({
  participant,
  message,
}: {
  participant: { id: string; name: string; photo: string; verified?: boolean };
  message?: string;
}) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl"
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
    >
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <Image
          src={participant.photo}
          alt={participant.name}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-white">{participant.name}</span>
          {participant.verified && (
            <BadgeCheck className="w-4 h-4" style={{ color: "#D4AF37" }} />
          )}
        </div>
        {message && (
          <p className="text-white/50 text-sm truncate">"{message}"</p>
        )}
      </div>
    </div>
  );
}

export function SessionDetailContent({ sessionId }: { sessionId: string }) {
  const t = useTranslations("sesh");
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isJoining, setIsJoining] = useState(false);

  const session = getSessionById(sessionId);

  // Entrance animation
  useEffect(() => {
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(60, { start: 100 }),
        duration: 400,
        easing: "easeOutCubic",
      });
    }
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-white/60 font-medium mb-2">Session not found</h3>
          <Link
            href="/sesh"
            className="text-green-400 text-sm hover:underline"
          >
            Back to sessions
          </Link>
        </div>
      </div>
    );
  }

  const strainType = session.details.strainType || "any";
  const colors = strainColors[strainType] || strainColors.any;
  const isLive = session.status === "live";
  const isFull = session.capacity.current >= session.capacity.max;
  const TypeIcon = sessionTypeIcons[session.type];

  const handleJoin = () => {
    setIsJoining(true);
    // Simulate join request
    setTimeout(() => {
      setIsJoining(false);
      // Show success toast or navigate to chat
      router.push("/chat");
    }, 1500);
  };

  const handleMessage = () => {
    router.push("/chat");
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 py-4 flex items-center justify-between"
        style={{
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
        >
          <ChevronLeft className="w-5 h-5 text-white/60" />
        </button>
        <div className="flex items-center gap-2">
          {isLive && (
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
              style={{ background: "rgba(239, 68, 68, 0.2)", color: "#ef4444" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              LIVE
            </span>
          )}
        </div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10">
          <Flag className="w-5 h-5 text-white/40" />
        </button>
      </div>

      {/* Content */}
      <div ref={contentRef} className="px-4 space-y-6">
        {/* Host Card */}
        <div
          className="p-5 rounded-3xl opacity-0"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={`/profile/${session.host.id}`}
              className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/10"
            >
              <Image
                src={session.host.photo}
                alt={session.host.name}
                fill
                className="object-cover"
                sizes="80px"
              />
              {session.host.online && (
                <span
                  className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 animate-pulse"
                  style={{
                    backgroundColor: "#22c55e",
                    borderColor: "var(--color-black)",
                  }}
                />
              )}
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display text-xl text-white">
                  {session.host.name}, {session.host.age}
                </h2>
                {session.host.verified && (
                  <BadgeCheck className="w-5 h-5" style={{ color: "#D4AF37" }} />
                )}
              </div>
              {session.location && (
                <div className="flex items-center gap-1.5 text-white/50 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {session.location.distance} - {session.location.areaName}
                  </span>
                </div>
              )}
              {session.type === "virtual" && (
                <div className="flex items-center gap-1.5 text-purple-400 text-sm mt-1">
                  <Video className="w-4 h-4" />
                  <span>Virtual Session</span>
                </div>
              )}
            </div>
          </div>

          <Link
            href={`/profile/${session.host.id}`}
            className="block w-full py-2.5 rounded-xl text-center text-sm font-medium transition-all hover:bg-white/10"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            View {session.host.name}'s Profile
          </Link>
        </div>

        {/* Description */}
        {session.details.title && (
          <div className="opacity-0">
            <h3 className="font-display text-lg text-white mb-2">
              {session.details.title}
            </h3>
            <p className="text-white/60 leading-relaxed">
              {session.details.description}
            </p>
          </div>
        )}

        {/* Session Details */}
        <div
          className="p-5 rounded-2xl space-y-4 opacity-0"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Strain */}
          {session.details.strain && (
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: colors.bg }}
              >
                <Leaf className="w-5 h-5" style={{ color: colors.text }} />
              </div>
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider">
                  Strain
                </div>
                <div className="text-white font-medium">
                  {session.details.strain}{" "}
                  <span className="text-white/40 capitalize">
                    ({session.details.strainType})
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Timing */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255, 255, 255, 0.08)" }}
            >
              <Clock className="w-5 h-5 text-white/60" />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-wider">
                When
              </div>
              <div className="text-white font-medium">
                {formatSessionTiming(session)}
                {session.timing.duration && (
                  <span className="text-white/40">
                    {" "}
                    - ~{session.timing.duration} min
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Session Type */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255, 255, 255, 0.08)" }}
            >
              <TypeIcon className="w-5 h-5 text-white/60" />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-wider">
                Session Type
              </div>
              <div className="text-white font-medium">
                {sessionTypeLabels[session.type]}
              </div>
            </div>
          </div>

          {/* Capacity */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255, 255, 255, 0.08)" }}
            >
              <Users className="w-5 h-5 text-white/60" />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-wider">
                Capacity
              </div>
              <div className="text-white font-medium">
                Looking for {session.capacity.max - session.capacity.current} more
                <span className="text-white/40">
                  {" "}
                  ({session.capacity.current}/{session.capacity.max} joined)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Participants */}
        {session.participants.accepted.length > 0 && (
          <div className="opacity-0">
            <h4 className="text-white/50 text-sm font-medium uppercase tracking-wider mb-3">
              Already Joined ({session.participants.accepted.length})
            </h4>
            <div className="space-y-2">
              {session.participants.accepted.map((participant) => (
                <ParticipantCard
                  key={participant.id}
                  participant={participant}
                  message="Can't wait!"
                />
              ))}
            </div>
          </div>
        )}

        {/* Pending Requests */}
        {session.participants.pending.length > 0 && (
          <div className="opacity-0">
            <h4 className="text-white/50 text-sm font-medium uppercase tracking-wider mb-3">
              Pending ({session.participants.pending.length})
            </h4>
            <div className="space-y-2">
              {session.participants.pending.map((participant) => (
                <ParticipantCard
                  key={participant.id}
                  participant={participant}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Actions */}
      <div
        className="fixed bottom-0 inset-x-0 p-4 pb-6 safe-bottom"
        style={{
          background:
            "linear-gradient(to top, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 0.95) 80%, transparent 100%)",
        }}
      >
        <div className="flex gap-3 max-w-md mx-auto">
          <button
            onClick={handleMessage}
            className="flex-1 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <MessageCircle className="w-5 h-5" />
            Message Host
          </button>

          {!isFull && (
            <button
              onClick={handleJoin}
              disabled={isJoining}
              className="flex-1 py-4 rounded-2xl font-display font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                color: "white",
                boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
              }}
            >
              {isJoining ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <Leaf className="w-5 h-5" />
                  Request to Join
                </>
              )}
            </button>
          )}

          {isFull && (
            <div
              className="flex-1 py-4 rounded-2xl font-medium flex items-center justify-center gap-2"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                color: "rgba(255, 255, 255, 0.3)",
              }}
            >
              Session Full
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
