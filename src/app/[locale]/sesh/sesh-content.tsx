"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  MapPin,
  BadgeCheck,
  Clock,
  Users,
  Leaf,
  Plus,
  Video,
  ChevronRight,
  Flame,
} from "lucide-react";
import anime from "animejs";
import { Link } from "~/i18n/routing";
import {
  getNearbySessions,
  getLiveSessions,
  formatSessionTiming,
} from "~/lib/mock-sessions";
import type { Session } from "~/lib/types";

// Strain type colors
const strainColors: Record<string, { bg: string; text: string; glow: string }> = {
  sativa: {
    bg: "rgba(34, 197, 94, 0.2)",
    text: "#4ade80",
    glow: "rgba(34, 197, 94, 0.4)",
  },
  indica: {
    bg: "rgba(147, 51, 234, 0.2)",
    text: "#c084fc",
    glow: "rgba(147, 51, 234, 0.4)",
  },
  hybrid: {
    bg: "rgba(234, 179, 8, 0.2)",
    text: "#facc15",
    glow: "rgba(234, 179, 8, 0.4)",
  },
  edibles: {
    bg: "rgba(251, 146, 60, 0.2)",
    text: "#fb923c",
    glow: "rgba(251, 146, 60, 0.4)",
  },
  any: {
    bg: "rgba(255, 255, 255, 0.1)",
    text: "rgba(255, 255, 255, 0.7)",
    glow: "rgba(255, 255, 255, 0.2)",
  },
};

// Session Card Component
function SessionCard({ session }: { session: Session }) {
  const t = useTranslations("sesh");
  const strainType = session.details.strainType || "any";
  const colors = strainColors[strainType] || strainColors.any;
  const isLive = session.status === "live";
  const isFull = session.capacity.current >= session.capacity.max;
  const isVirtual = session.type === "virtual";

  return (
    <Link
      href={`/sesh/${session.id}`}
      className="block rounded-3xl p-5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: `1px solid ${isLive ? colors.glow : "rgba(255, 255, 255, 0.08)"}`,
        boxShadow: isLive ? `0 0 20px ${colors.glow}` : "none",
      }}
    >
      {/* Header: Host + Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10">
            <Image
              src={session.host.photo}
              alt={session.host.name}
              fill
              className="object-cover"
              sizes="48px"
            />
            {session.host.online && (
              <span
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 animate-pulse"
                style={{
                  backgroundColor: "#22c55e",
                  borderColor: "var(--color-black)",
                }}
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-medium text-white">
                {session.host.name}
              </span>
              {session.host.verified && (
                <BadgeCheck className="w-4 h-4" style={{ color: "#D4AF37" }} />
              )}
            </div>
            {session.location && (
              <div className="flex items-center gap-1 text-white/40 text-sm">
                <MapPin className="w-3 h-3" />
                <span>{session.location.areaName}</span>
                <span className="text-white/20">-</span>
                <span>{session.location.distance}</span>
              </div>
            )}
            {isVirtual && (
              <div className="flex items-center gap-1 text-purple-400 text-sm">
                <Video className="w-3 h-3" />
                <span>{t("virtualSession")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex flex-col items-end gap-1">
          {isLive && (
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
              style={{
                background: "rgba(239, 68, 68, 0.2)",
                color: "#ef4444",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {t("live")}
            </span>
          )}
          <span
            className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1"
            style={{ background: "rgba(255, 255, 255, 0.1)", color: "rgba(255, 255, 255, 0.7)" }}
          >
            <Clock className="w-3 h-3" />
            {formatSessionTiming(session)}
          </span>
        </div>
      </div>

      {/* Title & Description */}
      {session.details.title && (
        <h3 className="font-display text-lg text-white mb-1">
          {session.details.title}
        </h3>
      )}
      <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">
        {session.details.description}
      </p>

      {/* Strain Badge */}
      {session.details.strain && (
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
          style={{ background: colors.bg, color: colors.text }}
        >
          <Leaf className="w-3.5 h-3.5" />
          {session.details.strain}
        </div>
      )}

      {/* Footer: Participants + CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-3">
          {/* Participant Avatars */}
          <div className="flex -space-x-2">
            {session.participants.accepted.slice(0, 3).map((p, i) => (
              <div
                key={p.id}
                className="w-7 h-7 rounded-full overflow-hidden border-2"
                style={{ borderColor: "var(--color-black)", zIndex: 3 - i }}
              >
                <Image
                  src={p.photo}
                  alt={p.name}
                  width={28}
                  height={28}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {/* Capacity */}
          <div className="flex items-center gap-1 text-white/40 text-sm">
            <Users className="w-4 h-4" />
            <span>
              {session.capacity.current}/{session.capacity.max}
            </span>
          </div>
        </div>

        {/* CTA */}
        {isFull ? (
          <span className="text-white/30 text-sm font-medium">{t("full")}</span>
        ) : (
          <span
            className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
            style={{ color: colors.text }}
          >
            {t("join")}
            <ChevronRight className="w-4 h-4" />
          </span>
        )}
      </div>
    </Link>
  );
}

// Filter Pill Component
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap"
      style={{
        background: active ? "var(--color-accent-1)" : "rgba(255, 255, 255, 0.08)",
        color: active ? "white" : "rgba(255, 255, 255, 0.6)",
        boxShadow: active ? "0 4px 12px rgba(var(--color-accent-1-rgb), 0.3)" : "none",
      }}
    >
      {label}
    </button>
  );
}

export function SeshContent() {
  const t = useTranslations("sesh");
  const tCommon = useTranslations("common");
  const contentRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "live" | "scheduled" | "virtual">("all");

  const allSessions = getNearbySessions();
  const liveSessions = getLiveSessions();

  // Filter sessions based on selection
  const filteredSessions = allSessions.filter((session) => {
    if (filter === "all") return true;
    if (filter === "live") return session.status === "live";
    if (filter === "scheduled") return session.status === "scheduled";
    if (filter === "virtual") return session.type === "virtual";
    return true;
  });

  // Content entrance animation
  useEffect(() => {
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(80, { start: 100 }),
        duration: 500,
        easing: "easeOutCubic",
      });
    }
  }, []);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 py-4 border-b"
        style={{
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display text-2xl text-white flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-400" />
              {t("title")}
            </h1>
            <p className="text-white/50 text-sm">{t("subtitle")}</p>
          </div>

          {/* Create Session Button */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
            }}
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
          <FilterPill
            label={t("filters.all")}
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <FilterPill
            label={`${t("filters.live")} (${liveSessions.length})`}
            active={filter === "live"}
            onClick={() => setFilter("live")}
          />
          <FilterPill
            label={t("filters.scheduled")}
            active={filter === "scheduled"}
            onClick={() => setFilter("scheduled")}
          />
          <FilterPill
            label={t("filters.virtual")}
            active={filter === "virtual"}
            onClick={() => setFilter("virtual")}
          />
        </div>
      </div>

      {/* Sessions List */}
      <div ref={contentRef} className="px-4 pt-4 space-y-4">
        {/* Live Sessions Banner */}
        {filter === "all" && liveSessions.length > 0 && (
          <div
            className="p-4 rounded-2xl flex items-center gap-3 opacity-0"
            style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500/20">
              <Flame className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <span className="text-white font-medium">
                {liveSessions.length} {t("liveNow")}
              </span>
              <p className="text-white/50 text-sm">{t("joinNow")}</p>
            </div>
          </div>
        )}

        {/* Session Cards */}
        {filteredSessions.map((session) => (
          <div key={session.id} className="opacity-0">
            <SessionCard session={session} />
          </div>
        ))}

        {/* Empty State */}
        {filteredSessions.length === 0 && (
          <div className="text-center py-12 opacity-0">
            <Leaf className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-white/60 font-medium mb-2">{t("noSessions")}</h3>
            <p className="text-white/40 text-sm">{t("beTheFirst")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
