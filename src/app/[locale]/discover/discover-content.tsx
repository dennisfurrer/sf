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
} from "lucide-react";
import anime from "animejs";
import { Link, useRouter, usePathname } from "~/i18n/routing";
import { mockProfiles, type Profile } from "~/lib/mock-data";
import { getNearbySessions } from "~/lib/mock-sessions";
import { HeroHeader } from "~/components/layout/hero-header";
import { ThemeSwitcher } from "~/components/settings/theme-switcher";

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

// Feature Card - Sesh
function SeshFeatureCard() {
  const t = useTranslations("discover.features.sesh");
  const sessions = getNearbySessions();
  const nearbyCount = sessions.length;
  const nearbyProfiles = sessions.slice(0, 3).map(s => s.host);

  return (
    <Link
      href="/sesh"
      className="block rounded-3xl p-5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
      style={{
        background: "linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.05) 100%)",
        border: "1px solid rgba(76, 175, 80, 0.3)",
        boxShadow: "0 8px 32px rgba(76, 175, 80, 0.15)",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(76, 175, 80, 0.3)" }}
        >
          <Leaf className="w-6 h-6 text-green-400" />
        </div>
        <span
          className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
          style={{
            background: "rgba(76, 175, 80, 0.2)",
            color: "#4ade80",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {nearbyCount} active
        </span>
      </div>

      <h3 className="font-display text-xl font-medium text-white mb-1">
        {t("title")}
      </h3>
      <p className="text-white/50 text-sm mb-4 leading-relaxed">
        {t("description")}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {nearbyProfiles.map((profile, i) => (
            <div
              key={profile.id}
              className="w-8 h-8 rounded-full overflow-hidden border-2"
              style={{ borderColor: "var(--color-black)", zIndex: 3 - i }}
            >
              <Image
                src={profile.photo}
                alt={profile.name}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          ))}
          {nearbyCount > 3 && (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2"
              style={{
                background: "rgba(76, 175, 80, 0.3)",
                borderColor: "var(--color-black)",
                color: "#4ade80",
              }}
            >
              +{nearbyCount - 3}
            </div>
          )}
        </div>
        <span className="text-green-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          {t("cta")}
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

// Feature Card - Vibe
function VibeFeatureCard() {
  const t = useTranslations("discover.features.vibe");
  const onlineCount = 847; // Mock

  return (
    <Link
      href="/vibe"
      className="block rounded-3xl p-5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
      style={{
        background: "linear-gradient(135deg, rgba(156, 39, 176, 0.2) 0%, rgba(156, 39, 176, 0.05) 100%)",
        border: "1px solid rgba(156, 39, 176, 0.3)",
        boxShadow: "0 8px 32px rgba(156, 39, 176, 0.15)",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(156, 39, 176, 0.3)" }}
        >
          <Video className="w-6 h-6 text-purple-400" />
        </div>
        <span
          className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
          style={{
            background: "rgba(156, 39, 176, 0.2)",
            color: "#c084fc",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          {onlineCount} vibing
        </span>
      </div>

      <h3 className="font-display text-xl font-medium text-white mb-1">
        {t("title")}
      </h3>
      <p className="text-white/50 text-sm mb-4 leading-relaxed">
        {t("description")}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎲</span>
          <span className="text-white/40 text-sm">{t("instant")}</span>
        </div>
        <span className="text-purple-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          {t("cta")}
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

// Feature Card - Match
function MatchFeatureCard() {
  const t = useTranslations("discover.features.match");
  const newLikes = 3;
  const newMatches = 2;

  return (
    <Link
      href="/match"
      className="block rounded-3xl p-5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
      style={{
        background: "linear-gradient(135deg, rgba(233, 30, 99, 0.2) 0%, rgba(233, 30, 99, 0.05) 100%)",
        border: "1px solid rgba(233, 30, 99, 0.3)",
        boxShadow: "0 8px 32px rgba(233, 30, 99, 0.15)",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(233, 30, 99, 0.3)" }}
        >
          <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
        </div>
        {(newLikes > 0 || newMatches > 0) && (
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: "rgba(233, 30, 99, 0.2)",
              color: "#f472b6",
            }}
          >
            {newLikes} likes • {newMatches} matches
          </span>
        )}
      </div>

      <h3 className="font-display text-xl font-medium text-white mb-1">
        {t("title")}
      </h3>
      <p className="text-white/50 text-sm mb-4 leading-relaxed">
        {t("description")}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-pink-400" />
          <span className="text-white/40 text-sm">{t("compatibility")}</span>
        </div>
        <span className="text-pink-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          {t("cta")}
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

// Creator Card - For the popular creators section
function CreatorCard({ profile }: { profile: Profile }) {
  return (
    <Link
      href={`/profile/${profile.id}`}
      className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
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
                background: "rgba(255, 255, 255, 0.08)",
                color: "rgba(255, 255, 255, 0.7)",
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

  // Track scroll for effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 300, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Content entrance animation
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

  // Language toggle
  const toggleLanguage = () => {
    const newLocale = pathname.startsWith("/de") ? "en" : "de";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header with scroll compression */}
      <div
        style={{
          transform: `scale(${1 - scrollProgress * 0.15})`,
          opacity: 1 - scrollProgress * 0.3,
          transformOrigin: "top center",
        }}
      >
        <HeroHeader
          tagline={t("tagline")}
          onlineCount={4269}
          onLanguageToggle={toggleLanguage}
        />
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="px-4 pb-8 space-y-6 -mt-8">
        {/* Theme Switcher */}
        <section className="flex justify-center pt-4 opacity-0">
          <ThemeSwitcher />
        </section>

        {/* Three Feature Cards - The Hub */}
        <section className="space-y-4 opacity-0">
          <SeshFeatureCard />
          <VibeFeatureCard />
          <MatchFeatureCard />
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
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {mockProfiles.slice(0, 6).map((profile) => (
              <StoryRing key={profile.id} profile={profile} />
            ))}
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
