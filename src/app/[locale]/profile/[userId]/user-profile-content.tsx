"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLeft, Heart, MessageCircle, BadgeCheck, MapPin, Sparkles, Flame, Music, Leaf } from "lucide-react";
import anime from "animejs";
import { getProfileById } from "~/lib/mock-data";
import { Link } from "~/i18n/routing";

// Vibe Quote Card - The main storytelling element
function VibeQuote({ promptKey, answer, index }: { promptKey: string; answer: string; index: number }) {
  const t = useTranslations("warStoryPrompts");
  const isEven = index % 2 === 0;

  return (
    <div
      className="relative rounded-3xl p-6 overflow-hidden"
      style={{
        background: isEven
          ? "linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(255, 45, 146, 0.08) 100%)"
          : "linear-gradient(135deg, rgba(157, 78, 221, 0.15) 0%, rgba(255, 45, 146, 0.08) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Decorative quote mark */}
      <div
        className="absolute top-4 right-4 text-6xl font-serif opacity-10"
        style={{ color: "var(--color-accent-1)" }}
      >
        "
      </div>

      <p
        className="text-sm font-medium mb-3 flex items-center gap-2"
        style={{ color: "var(--color-accent-1)" }}
      >
        <Sparkles className="w-4 h-4" />
        {t(promptKey)}
      </p>
      <p className="text-white text-lg font-display leading-relaxed italic">
        "{answer}"
      </p>
    </div>
  );
}

// Strain Chip - Visual and fun
function StrainChip({ name, index }: { name: string; index: number }) {
  const emojis = ["🌿", "💨", "✨", "🔥", "🍃"];

  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 hover:scale-105 cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(45, 106, 79, 0.2) 0%, rgba(52, 211, 153, 0.1) 100%)",
        border: "1px solid rgba(52, 211, 153, 0.3)",
        boxShadow: "0 4px 20px rgba(52, 211, 153, 0.1)",
      }}
    >
      <span className="text-lg">{emojis[index % emojis.length]}</span>
      <span className="text-white font-medium">{name}</span>
    </div>
  );
}

// Interest Bubble - Playful design
function InterestBubble({ interest }: { interest: string }) {
  return (
    <span
      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-default"
      style={{
        background: "rgba(255, 255, 255, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: "rgba(255, 255, 255, 0.9)",
      }}
    >
      {interest}
    </span>
  );
}

// Vibe Stat - Quick personality indicators
function VibeStat({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-2xl mb-1">{emoji}</span>
      <span className="text-white font-medium text-sm">{value}</span>
      <span className="text-white/40 text-xs">{label}</span>
    </div>
  );
}

interface UserProfileContentProps {
  userId: string;
}

export function UserProfileContent({ userId }: UserProfileContentProps) {
  const t = useTranslations("profile");
  const tPrefs = useTranslations("preferences");
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  // Staggered content animation
  useEffect(() => {
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100, { start: 200 }),
        duration: 600,
        easing: "easeOutCubic",
      });
    }
  }, []);

  const profile = getProfileById(userId);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-text-secondary">Profile not found</p>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="opacity-0 pb-32">
      {/* Hero Image - Full bleed with personality */}
      <div className="relative h-[60vh]">
        <Image
          src={profile.photo}
          alt={profile.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, var(--color-black) 0%, rgba(5,5,5,0.6) 40%, transparent 100%)"
          }}
        />

        {/* Back button */}
        <Link href="/discover" className="absolute top-4 left-4 safe-top icon-btn">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Profile info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {/* Name and verification */}
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display text-4xl font-medium text-white">
              {profile.name}
            </h1>
            <span className="text-3xl text-white/60 font-light">{profile.age}</span>
            {profile.verified && <BadgeCheck className="w-7 h-7" style={{ color: "#D4AF37" }} />}
          </div>

          {/* Location with style */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <MapPin className="w-4 h-4" />
            <span>{profile.distance} away</span>
            <span className="text-white/30">•</span>
            <span>{profile.location}</span>
          </div>

          {/* Quick vibe badges */}
          <div className="flex gap-2 flex-wrap">
            {profile.verified && (
              <span className="badge-verified">
                <BadgeCheck className="w-3 h-3" />
                Verified
              </span>
            )}
            {profile.online && (
              <span className="badge-online">Online Now</span>
            )}
            <span
              className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              style={{
                background: "rgba(255, 107, 53, 0.2)",
                border: "1px solid rgba(255, 107, 53, 0.4)",
                color: "#ff8f5a",
              }}
            >
              <Flame className="w-3 h-3" />
              {tPrefs(`strainTypes.${profile.strainType}`)} lover
            </span>
          </div>
        </div>
      </div>

      {/* Content - The vibe showcase */}
      <div ref={contentRef} className="px-5 space-y-8 -mt-2">

        {/* Quick Vibe Check - At-a-glance personality */}
        <section
          className="rounded-3xl p-5 opacity-0"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div className="grid grid-cols-4 gap-4">
            <VibeStat
              emoji="🍃"
              label="Vibe"
              value={tPrefs(`strainTypes.${profile.strainType}`)}
            />
            <VibeStat
              emoji="💨"
              label="Style"
              value={profile.method[0] || "Joints"}
            />
            <VibeStat
              emoji="⚡"
              label="Level"
              value={tPrefs(`tolerances.${profile.tolerance}`)}
            />
            <VibeStat
              emoji="🌙"
              label="When"
              value={tPrefs(`frequencies.${profile.frequency}`)}
            />
          </div>
        </section>

        {/* War Stories - The heart of the profile */}
        <section className="opacity-0">
          <h2 className="font-display text-2xl text-white mb-5 flex items-center gap-3">
            <span className="text-2xl">✨</span>
            Get to Know Me
          </h2>
          <div className="space-y-4">
            {profile.warStories.map((story, i) => (
              <VibeQuote key={i} promptKey={story.promptKey} answer={story.answer} index={i} />
            ))}
          </div>
        </section>

        {/* Favorite Strains - Visual showcase */}
        <section className="opacity-0">
          <h2 className="font-display text-2xl text-white mb-5 flex items-center gap-3">
            <span className="text-2xl">🌿</span>
            My Go-To Strains
          </h2>
          <div className="flex flex-wrap gap-3">
            {profile.favoriteStrains.map((strain, i) => (
              <StrainChip key={strain} name={strain} index={i} />
            ))}
          </div>
        </section>

        {/* Interests - What makes them tick */}
        <section className="opacity-0">
          <h2 className="font-display text-2xl text-white mb-5 flex items-center gap-3">
            <span className="text-2xl">💫</span>
            What I'm Into
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <InterestBubble key={interest} interest={interest} />
            ))}
          </div>
        </section>

        {/* Availability - Casual invite */}
        <section className="opacity-0">
          <div
            className="rounded-3xl p-5 flex items-center gap-4"
            style={{
              background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(212, 175, 55, 0.2)" }}
            >
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <p className="text-white/50 text-sm">Down to hang</p>
              <p className="text-white font-medium">{profile.availability}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Fixed Action Buttons - Inviting CTAs */}
      <div
        className="fixed bottom-20 left-0 right-0 px-5 flex gap-3 max-w-md mx-auto"
        style={{ zIndex: 50 }}
      >
        <Link
          href="/match"
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #ff6b35 0%, #ff2d92 100%)",
            boxShadow: "0 8px 32px rgba(255, 45, 146, 0.4)",
          }}
        >
          <Heart className="w-5 h-5" fill="currentColor" />
          Vibe with {profile.name.split(' ')[0]}
        </Link>
        <Link
          href="/chat"
          className="w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </Link>
      </div>
    </div>
  );
}
