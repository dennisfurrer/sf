"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Settings,
  Edit3,
  BadgeCheck,
  MapPin,
  Globe,
  Sparkles,
  Flame,
  ChevronRight,
} from "lucide-react";
import anime from "animejs";
import { currentUser } from "~/lib/mock-data";
import { Link, useRouter, usePathname } from "~/i18n/routing";

// Vibe Quote Card - Personal story showcase
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

// Strain Chip
function StrainChip({ name, index }: { name: string; index: number }) {
  const emojis = ["🌿", "💨", "✨", "🔥", "🍃"];
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(45, 106, 79, 0.2) 0%, rgba(52, 211, 153, 0.1) 100%)",
        border: "1px solid rgba(52, 211, 153, 0.3)",
      }}
    >
      <span className="text-lg">{emojis[index % emojis.length]}</span>
      <span className="text-white font-medium">{name}</span>
    </div>
  );
}

// Vibe Stat
function VibeStat({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-2xl mb-1">{emoji}</span>
      <span className="text-white font-medium text-sm">{value}</span>
      <span className="text-white/40 text-xs">{label}</span>
    </div>
  );
}

// Settings Row
function SettingsRow({ icon: Icon, label, value, onClick }: {
  icon: typeof Globe;
  label: string;
  value?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 hover:bg-white/[0.03] transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-white/50" />
        <span className="text-white">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-white/40 text-sm">{value}</span>}
        <ChevronRight className="w-4 h-4 text-white/30" />
      </div>
    </button>
  );
}

export function MyProfileContent() {
  const t = useTranslations("profile");
  const tPrefs = useTranslations("preferences");
  const tSettings = useTranslations("settings");
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(80, { start: 150 }),
        duration: 500,
        easing: "easeOutCubic",
      });
    }
  }, []);

  const toggleLanguage = () => {
    const newLocale = pathname.startsWith("/de") ? "en" : "de";
    router.replace(pathname, { locale: newLocale });
  };

  const profile = currentUser;

  return (
    <div ref={pageRef} className="opacity-0 pb-24">
      {/* Hero Image */}
      <div className="relative h-[50vh]">
        <Image
          src={profile.photo}
          alt={profile.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, var(--color-black) 0%, rgba(5,5,5,0.5) 50%, transparent 100%)"
          }}
        />

        {/* Action buttons */}
        <Link href="#" className="absolute top-4 left-4 safe-top icon-btn">
          <Settings className="w-5 h-5" />
        </Link>
        <button className="absolute top-4 right-4 safe-top icon-btn">
          <Edit3 className="w-5 h-5" />
        </button>

        {/* Profile info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display text-4xl font-medium text-white">
              {profile.name}
            </h1>
            <span className="text-3xl text-white/60 font-light">{profile.age}</span>
            {profile.verified && <BadgeCheck className="w-7 h-7" style={{ color: "#D4AF37" }} />}
          </div>

          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <MapPin className="w-4 h-4" />
            <span>{profile.location}</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {profile.verified && (
              <span className="badge-verified">
                <BadgeCheck className="w-3 h-3" />
                Verified
              </span>
            )}
            <span className="badge-online">Online Now</span>
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

      {/* Content */}
      <div ref={contentRef} className="px-5 space-y-8 -mt-2">
        {/* Quick Vibe Check */}
        <section
          className="rounded-3xl p-5 opacity-0"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div className="grid grid-cols-4 gap-4">
            <VibeStat emoji="🍃" label="Vibe" value={tPrefs(`strainTypes.${profile.strainType}`)} />
            <VibeStat emoji="💨" label="Style" value={profile.method[0] || "Joints"} />
            <VibeStat emoji="⚡" label="Level" value={tPrefs(`tolerances.${profile.tolerance}`)} />
            <VibeStat emoji="🌙" label="When" value={tPrefs(`frequencies.${profile.frequency}`)} />
          </div>
        </section>

        {/* War Stories */}
        <section className="opacity-0">
          <h2 className="font-display text-2xl text-white mb-5 flex items-center gap-3">
            <span className="text-2xl">✨</span>
            My Stories
          </h2>
          <div className="space-y-4">
            {profile.warStories.map((story, i) => (
              <VibeQuote key={i} promptKey={story.promptKey} answer={story.answer} index={i} />
            ))}
          </div>
        </section>

        {/* Favorite Strains */}
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

        {/* Interests */}
        <section className="opacity-0">
          <h2 className="font-display text-2xl text-white mb-5 flex items-center gap-3">
            <span className="text-2xl">💫</span>
            What I'm Into
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                {interest}
              </span>
            ))}
          </div>
        </section>

        {/* Availability */}
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

        {/* Settings */}
        <section
          className="rounded-3xl overflow-hidden opacity-0"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <SettingsRow
            icon={Globe}
            label={tSettings("language")}
            value={pathname.startsWith("/de") ? "Deutsch" : "English"}
            onClick={toggleLanguage}
          />
          <div className="border-t border-white/[0.06] mx-4" />
          <SettingsRow
            icon={Settings}
            label={t("settings")}
          />
        </section>
      </div>
    </div>
  );
}
