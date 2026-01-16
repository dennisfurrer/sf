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
  Zap,
  Sparkles,
  X,
} from "lucide-react";
import anime from "animejs";
import { Link } from "~/i18n/routing";
import {
  getNearbySessions,
  getLiveSessions,
  formatSessionTiming,
} from "~/lib/mock-sessions";
import type { Session } from "~/lib/types";

// Coming Soon Modal
function ComingSoonModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative rounded-2xl p-6 max-w-xs w-full text-center"
        style={{
          background: "rgba(30, 30, 30, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>

        {/* Content */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{
            background: "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-1) 20%, transparent), color-mix(in srgb, var(--color-accent-2) 20%, transparent))",
          }}
        >
          <Sparkles className="w-8 h-8" style={{ color: "var(--color-accent-1)" }} />
        </div>
        <h3 className="font-display text-xl text-white mb-2">Coming Soon!</h3>
        <p className="text-white/50 text-sm">
          This feature is under development. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
}

// Session Card Component
function SessionCard({
  session,
  onJoin,
}: {
  session: Session;
  onJoin: () => void;
}) {
  const t = useTranslations("sesh");
  const isLive = session.status === "live";
  const isFull = session.capacity.current >= session.capacity.max;
  const isVirtual = session.type === "virtual";

  return (
    <div
      className="block rounded-3xl p-5 transition-all duration-300 group"
      style={{
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
        border: isLive
          ? "1px solid color-mix(in srgb, var(--color-accent-1) 50%, transparent)"
          : "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: isLive
          ? "0 0 30px -10px var(--glow-primary), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
          : "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Header: Host + Status */}
      <div className="flex items-start justify-between mb-4">
        <Link href={`/sesh/${session.id}`} className="flex items-center gap-3">
          <div
            className="relative w-12 h-12 rounded-full overflow-hidden"
            style={{
              boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.1)",
            }}
          >
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
                  backgroundColor: "var(--color-accent-1)",
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
              <div
                className="flex items-center gap-1 text-sm"
                style={{ color: "var(--color-accent-3)" }}
              >
                <Video className="w-3 h-3" />
                <span>{t("virtualSession")}</span>
              </div>
            )}
          </div>
        </Link>

        {/* Status Badge */}
        <div className="flex flex-col items-end gap-1.5">
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
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            <Clock className="w-3 h-3" />
            {formatSessionTiming(session)}
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <Link href={`/sesh/${session.id}`}>
        {session.details.title && (
          <h3 className="font-display text-lg text-white mb-1">
            {session.details.title}
          </h3>
        )}
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">
          {session.details.description}
        </p>
      </Link>

      {/* Strain Badge */}
      {session.details.strain && (
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
          style={{
            background: "color-mix(in srgb, var(--color-accent-1) 12%, transparent)",
            color: "color-mix(in srgb, var(--color-accent-1) 80%, white)",
          }}
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
                style={{ borderColor: "rgba(20, 20, 20, 1)", zIndex: 3 - i }}
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

        {/* Join Button */}
        {isFull ? (
          <span className="text-white/30 text-sm font-medium">{t("full")}</span>
        ) : (
          <button
            onClick={onJoin}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
            style={{
              background: "color-mix(in srgb, var(--color-accent-1) 20%, transparent)",
              color: "var(--color-accent-1)",
              border: "1px solid color-mix(in srgb, var(--color-accent-1) 30%, transparent)",
            }}
          >
            {t("join")}
          </button>
        )}
      </div>
    </div>
  );
}

// Filter Pill Component
function FilterPill({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap"
      style={{
        background: active
          ? "color-mix(in srgb, var(--color-accent-1) 25%, transparent)"
          : "rgba(255, 255, 255, 0.04)",
        color: active
          ? "var(--color-accent-1)"
          : "rgba(255, 255, 255, 0.4)",
        border: active
          ? "1px solid color-mix(in srgb, var(--color-accent-1) 40%, transparent)"
          : "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      {label}
      {count !== undefined && ` (${count})`}
    </button>
  );
}

export function SeshContent() {
  const t = useTranslations("sesh");
  const contentRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "live" | "scheduled" | "virtual">("all");
  const [showModal, setShowModal] = useState(false);

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
      {/* Coming Soon Modal */}
      {showModal && <ComingSoonModal onClose={() => setShowModal(false)} />}

      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 pt-4 pb-3 border-b safe-top"
        style={{
          background: "rgba(10, 10, 10, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="flex items-center justify-between mb-5 pt-3">
          <div>
            <h1 className="font-display text-2xl text-white flex items-center gap-2 mb-1">
              <Leaf className="w-6 h-6" style={{ color: "var(--color-accent-1)" }} />
              {t("title")}
            </h1>
            <p className="text-white/40 text-sm">{t("subtitle")}</p>
          </div>

          {/* Create Session Button */}
          <Link
            href="/sesh/create"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-1) 80%, black), color-mix(in srgb, var(--color-accent-2) 80%, black))",
              boxShadow: "0 4px 16px color-mix(in srgb, var(--glow-primary) 50%, transparent)",
            }}
          >
            <Plus className="w-5 h-5 text-white" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
          <FilterPill
            label={t("filters.all")}
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <FilterPill
            label={t("filters.live")}
            count={liveSessions.length}
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
        {/* Quick Match Card */}
        <div
          className="relative p-5 rounded-3xl overflow-hidden opacity-0"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Accent glow */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
            style={{
              background: "var(--gradient-glow)",
              filter: "blur(30px)",
            }}
          />

          <div className="relative flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-1) 70%, black), color-mix(in srgb, var(--color-accent-2) 70%, black))",
                boxShadow: "0 4px 12px color-mix(in srgb, var(--glow-primary) 40%, transparent)",
              }}
            >
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-base text-white flex items-center gap-2">
                Quick Match
                <Sparkles className="w-3.5 h-3.5" style={{ color: "color-mix(in srgb, var(--color-accent-2) 80%, white)" }} />
              </h3>
              <p className="text-white/40 text-sm">Find someone to smoke with NOW</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="relative w-full py-3 rounded-xl font-display text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-1) 70%, black), color-mix(in srgb, var(--color-accent-2) 70%, black))",
              boxShadow: "0 4px 16px color-mix(in srgb, var(--glow-primary) 40%, transparent)",
            }}
          >
            <Flame className="w-4 h-4" />
            <span>Match Me</span>
          </button>
        </div>

        {/* Live Sessions Banner */}
        {liveSessions.length > 0 && (
          <div
            className="p-3.5 rounded-2xl flex items-center gap-3 opacity-0"
            style={{
              background: "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-2) 10%, transparent) 0%, transparent 100%)",
              border: "1px solid color-mix(in srgb, var(--color-accent-2) 20%, transparent)",
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "color-mix(in srgb, var(--color-accent-2) 15%, transparent)",
              }}
            >
              <Flame className="w-4 h-4" style={{ color: "color-mix(in srgb, var(--color-accent-2) 80%, white)" }} />
            </div>
            <div className="flex-1">
              <span className="text-white text-sm font-medium">
                {liveSessions.length} {t("liveNow")}
              </span>
              <p className="text-white/40 text-xs">{t("joinNow")}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20" />
          </div>
        )}

        {/* Session Cards */}
        {filteredSessions.map((session) => (
          <div key={session.id} className="opacity-0">
            <SessionCard session={session} onJoin={() => setShowModal(true)} />
          </div>
        ))}

        {/* Empty State */}
        {filteredSessions.length === 0 && (
          <div className="text-center py-12 opacity-0">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <Leaf className="w-7 h-7 text-white/20" />
            </div>
            <h3 className="text-white/60 font-medium mb-2">{t("noSessions")}</h3>
            <p className="text-white/40 text-sm mb-4">{t("beTheFirst")}</p>
            <Link
              href="/sesh/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-1) 70%, black), color-mix(in srgb, var(--color-accent-2) 70%, black))",
                boxShadow: "0 4px 12px color-mix(in srgb, var(--glow-primary) 40%, transparent)",
              }}
            >
              <Plus className="w-4 h-4" />
              Create Session
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
