"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  MapPin,
  BadgeCheck,
  ChevronRight,
  Sparkles,
  Leaf,
  Video,
  Heart,
  Users,
  Flame,
  Zap,
} from "lucide-react";
import anime from "animejs";
import { Link, useRouter, usePathname } from "~/i18n/routing";
import { mockProfiles, type Profile } from "~/lib/mock-data";
import { getNearbySessions } from "~/lib/mock-sessions";
import { HeroHeader } from "~/components/layout/hero-header";

// Story Ring Component
function StoryRing({ profile }: { profile: Profile }) {
  return (
    <Link
      href={`/profile/${profile.id}`}
      className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
    >
      <div className="story-ring transition-transform duration-300 group-hover:scale-105">
        <div className="story-ring-inner">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="64px"
            />
            {profile.online && (
              <span
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 animate-pulse"
                style={{
                  backgroundColor: "#22c55e",
                  borderColor: "var(--color-black)",
                }}
              />
            )}
          </div>
        </div>
      </div>
      <span className="text-xs text-white/60 font-medium truncate max-w-[64px] group-hover:text-white transition-colors">
        {profile.name}
      </span>
    </Link>
  );
}

// Premium Feature Card - Vibe (Full Width)
function VibeFeatureCard() {
  const t = useTranslations("discover.features.vibe");
  const onlineCount = 847;

  return (
    <Link
      href="/vibe"
      className="group relative block rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        // 3D layered shadow effect
        boxShadow: `
          0 2px 4px rgba(0, 0, 0, 0.1),
          0 4px 8px rgba(0, 0, 0, 0.1),
          0 8px 16px rgba(0, 0, 0, 0.15),
          0 16px 32px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.05),
          0 0 60px -10px var(--glow-secondary)
        `,
      }}
    >
      {/* Background layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `linear-gradient(135deg, var(--color-accent-3) 0%, transparent 50%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(20, 20, 20, 0.7) 0%, rgba(20, 20, 20, 0.95) 100%)",
          backdropFilter: "blur(20px)",
        }}
      />

      {/* Animated glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 50%, var(--glow-secondary) 0%, transparent 50%)`,
          filter: "blur(30px)",
        }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-5 flex items-center gap-4">
        {/* Icon with 3D effect */}
        <div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
          style={{
            background: `linear-gradient(145deg, var(--color-accent-3), color-mix(in srgb, var(--color-accent-3) 70%, black))`,
            boxShadow: `
              0 4px 12px color-mix(in srgb, var(--color-accent-3) 40%, transparent),
              0 8px 24px color-mix(in srgb, var(--color-accent-3) 20%, transparent),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2)
            `,
          }}
        >
          <Video className="w-8 h-8 text-white drop-shadow-lg" />
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-display text-xl font-semibold text-white">
              {t("title")}
            </h3>
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--color-accent-1)" }}
              />
              <span className="text-xs font-medium" style={{ color: "var(--color-accent-1)" }}>
                {onlineCount} vibing
              </span>
            </div>
          </div>
          <p className="text-white/50 text-sm">{t("description")}</p>
        </div>

        {/* Arrow */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
        </div>
      </div>
    </Link>
  );
}

// Premium Feature Card - Match (Half Width)
function MatchFeatureCardCompact() {
  const t = useTranslations("discover.features.match");
  const newLikes = 3;

  return (
    <Link
      href="/match"
      className="group relative block rounded-3xl overflow-hidden h-full transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        boxShadow: `
          0 2px 4px rgba(0, 0, 0, 0.1),
          0 4px 8px rgba(0, 0, 0, 0.1),
          0 8px 16px rgba(0, 0, 0, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.05),
          0 0 40px -10px var(--glow-primary)
        `,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(135deg, var(--color-accent-2) 0%, transparent 60%)`,
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(20, 20, 20, 0.75) 0%, rgba(20, 20, 20, 0.95) 100%)",
          backdropFilter: "blur(20px)",
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 20% 30%, var(--glow-primary) 0%, transparent 50%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          {/* Icon */}
          <div
            className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{
              background: `linear-gradient(145deg, var(--color-accent-2), color-mix(in srgb, var(--color-accent-2) 70%, black))`,
              boxShadow: `
                0 4px 12px color-mix(in srgb, var(--color-accent-2) 40%, transparent),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -2px 4px rgba(0, 0, 0, 0.2)
              `,
            }}
          >
            <Heart className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" />
          </div>

          {/* Badge */}
          {newLikes > 0 && (
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <Zap className="w-3 h-3" style={{ color: "var(--color-accent-2)" }} />
              <span className="text-[11px] font-medium" style={{ color: "var(--color-accent-2)" }}>
                {newLikes} new
              </span>
            </div>
          )}
        </div>

        <h3 className="font-display text-lg font-semibold text-white mb-1">
          {t("title")}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4" style={{ color: "var(--color-accent-2)", opacity: 0.7 }} />
            <span className="text-white/40 text-xs">Compatibility</span>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}

// Premium Feature Card - Sesh (Half Width)
function SeshFeatureCardCompact() {
  const t = useTranslations("discover.features.sesh");
  const sessions = getNearbySessions();
  const nearbyCount = sessions.length;

  return (
    <Link
      href="/sesh"
      className="group relative block rounded-3xl overflow-hidden h-full transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        boxShadow: `
          0 2px 4px rgba(0, 0, 0, 0.1),
          0 4px 8px rgba(0, 0, 0, 0.1),
          0 8px 16px rgba(0, 0, 0, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.05),
          0 0 40px -10px var(--glow-primary)
        `,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(135deg, var(--color-accent-1) 0%, transparent 60%)`,
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(20, 20, 20, 0.75) 0%, rgba(20, 20, 20, 0.95) 100%)",
          backdropFilter: "blur(20px)",
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 20% 30%, var(--glow-primary) 0%, transparent 50%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          {/* Icon */}
          <div
            className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
            style={{
              background: `linear-gradient(145deg, var(--color-accent-1), color-mix(in srgb, var(--color-accent-1) 70%, black))`,
              boxShadow: `
                0 4px 12px color-mix(in srgb, var(--color-accent-1) 40%, transparent),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -2px 4px rgba(0, 0, 0, 0.2)
              `,
            }}
          >
            <Leaf className="w-6 h-6 text-white drop-shadow-lg" />
          </div>

          {/* Live badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--color-accent-1)" }}
            />
            <span className="text-[11px] font-medium" style={{ color: "var(--color-accent-1)" }}>
              {nearbyCount} live
            </span>
          </div>
        </div>

        <h3 className="font-display text-lg font-semibold text-white mb-1">
          {t("title")}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          {/* Avatars stack */}
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {sessions.slice(0, 3).map((s, i) => (
                <div
                  key={s.id}
                  className="w-7 h-7 rounded-full overflow-hidden border-2"
                  style={{
                    borderColor: "rgba(20, 20, 20, 1)",
                    zIndex: 3 - i,
                  }}
                >
                  <Image
                    src={s.host.photo}
                    alt={s.host.name}
                    width={28}
                    height={28}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {nearbyCount > 3 && (
              <span className="ml-2 text-xs text-white/40">+{nearbyCount - 3}</span>
            )}
          </div>
          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}

// Creator Card
function CreatorCard({ profile }: { profile: Profile }) {
  return (
    <Link
      href={`/profile/${profile.id}`}
      className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/10 group-hover:ring-[var(--color-accent-1)] transition-all">
        <Image
          src={profile.photo}
          alt={profile.name}
          fill
          className="object-cover"
          sizes="56px"
        />
        {profile.online && (
          <span
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
            style={{
              backgroundColor: "#22c55e",
              borderColor: "var(--color-black)",
            }}
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-display font-medium text-white group-hover:text-[var(--color-accent-1)] transition-colors">
            {profile.name}, {profile.age}
          </h4>
          {profile.verified && (
            <BadgeCheck className="w-4 h-4" style={{ color: "#D4AF37" }} />
          )}
        </div>
        <div className="flex items-center gap-1 text-white/50 text-sm mt-0.5">
          <MapPin className="w-3 h-3" />
          <span>{profile.distance}</span>
        </div>
        <div className="flex gap-1.5 mt-2">
          {profile.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
    </Link>
  );
}

export function DiscoverContent() {
  const t = useTranslations("discover");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 200, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(80, { start: 200 }),
        duration: 500,
        easing: "easeOutCubic",
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Header with scroll compression */}
      <div
        style={{
          transform: `scale(${1 - scrollProgress * 0.1})`,
          opacity: 1 - scrollProgress * 0.3,
          transformOrigin: "top center",
        }}
      >
        <HeroHeader onlineCount={4269} />
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="px-4 pb-8 space-y-5 -mt-4">
        {/* Feature Cards - Premium Layout */}
        <section className="space-y-4 opacity-0">
          {/* Vibe - Full Width */}
          <VibeFeatureCard />

          {/* Match + Sesh - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <MatchFeatureCardCompact />
            <SeshFeatureCardCompact />
          </div>
        </section>

        {/* Stories Row */}
        <section className="opacity-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: "var(--color-accent-1)" }} />
              {t("stories")}
            </h2>
            <button
              className="text-sm font-medium px-3 py-1 rounded-full transition-all"
              style={{ color: "var(--color-accent-1)" }}
            >
              {tCommon("more")}
            </button>
          </div>
          <div className="relative overflow-hidden">
            <div
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
              style={{
                maskImage: "linear-gradient(to right, black 0%, black 75%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 0%, black 75%, transparent 100%)",
              }}
            >
              {mockProfiles.slice(0, 6).map((profile) => (
                <StoryRing key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Creators */}
        <section className="opacity-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg text-white flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: "var(--color-accent-1)" }} />
              {t("popularCreators")}
            </h2>
            <button
              className="text-sm font-medium px-3 py-1 rounded-full transition-all"
              style={{ color: "var(--color-accent-1)" }}
            >
              {tCommon("seeAll")}
            </button>
          </div>
          <div className="space-y-3">
            {mockProfiles.slice(0, 4).map((profile) => (
              <CreatorCard key={profile.id} profile={profile} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
